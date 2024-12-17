<script setup lang="ts">
import { quizService } from '../services/quiz.service';
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import { useTimeout } from '@vueuse/core';
import BaseModal from '@/shared/components/BaseModal.vue';
import type { Term } from '@/shared/types/term';
import type { QuizConfig, QuizResult } from '../types';
import { vaultService } from '@/shared/services/vault.service';
import TermDetails from '@/features/term-details/components/TermDetails.vue';

const props = defineProps<{ config: QuizConfig }>();

const emit = defineEmits<{
  (e: 'finish', data: QuizResult): void;
}>();

const terms = [...props.config.terms];
const results = { yes: [] as Term[], no: [] as Term[] };

const currentTerm = ref(terms.shift()!);

const finished = ref(false);
const failureMode = ref(false);

useTimeout(props.config.duration || 0, {
  immediate: Boolean(props.config.duration),
  callback: () => (finished.value = true)
});

const timeoutId = ref<ReturnType<typeof setTimeout>>();

watch(
  [finished, failureMode, currentTerm],
  () => {
    if (timeoutId.value) clearTimeout(timeoutId.value);

    if (props.config.timer && !failureMode.value && !finished.value) {
      timeoutId.value = setTimeout(() => handleFailure(), props.config.timer);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (timeoutId.value) clearTimeout(timeoutId.value);
});

const showDetails = ref(false);

const input = ref('');
const wrongInput = ref(false);

const inputRef = useTemplateRef('repeat');

watch(showDetails, () => {
  if (!showDetails.value) inputRef.value?.focus();
});

const goNext = () => {
  if (failureMode.value && input.value.toLowerCase() !== currentTerm.value.content.toLowerCase()) {
    wrongInput.value = true;
    return;
  }

  failureMode.value = false;
  showDetails.value = false;

  input.value = '';
  wrongInput.value = false;

  const term = terms.shift();

  if (term) {
    currentTerm.value = term;
  } else {
    handleFinish();
  }
};

const handleFailure = () => {
  vaultService.setTermMetadata(currentTerm.value.id, {
    quiz: quizService.getStepBackward(currentTerm.value.metadata.quiz)
  });

  results.no.push(currentTerm.value);

  failureMode.value = true;
  showDetails.value = true;
};

const handleSuccess = () => {
  const termId = currentTerm.value.id;

  try {
    const forwardMetadata = quizService.getStepForward(currentTerm.value.metadata.quiz);
    vaultService.setTermMetadata(termId, { quiz: forwardMetadata });
  } catch {
    vaultService.setTermLearnedState(termId, true);
  }

  results.yes.push(currentTerm.value);

  goNext();
};

const handleFinish = () => {
  emit('finish', {
    collectionName: props.config.collectionName,
    termsTested: results
  });
};
</script>

<template>
  <section class="space-y-6 text-center bg-base-100">
    <div class="space-y-2">
      <header class="justify-center font-semibold">
        <h1>{{ config.collectionName }}</h1>
      </header>
      <div>
        <div class="relative">
          <div class="flex items-center justify-center gap-2 text-lg font-bold select-none">
            <span>{{ config.terms.length - terms.length }}</span>
            <span>/</span>
            <span>{{ config.terms.length }}</span>
          </div>
          <div
            v-if="config.duration !== null"
            class="absolute flex items-center justify-end w-56 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          >
            <span
              class="rounded-full chart size-4 tooltip"
              :style="`--duration:${config.duration / 1000}s;`"
              data-tip="Max Duration"
            />
          </div>
        </div>
        <progress
          class="w-56 progress"
          :value="config.terms.length - terms.length"
          :max="config.terms.length"
        />
      </div>
    </div>
    <div class="space-y-6">
      <template v-if="!failureMode">
        <p>Do you remember this term?</p>
        <span class="inline-block text-3xl font-bold">{{ currentTerm.content }}</span>
        <p class="text-sm text-base-content/50">Say it out loud</p>
      </template>
      <form v-else @submit.prevent="goNext()">
        <input
          ref="repeat"
          type="text"
          v-model.trim="input"
          class="w-full text-2xl text-center input input-bordered"
          :class="wrongInput ? 'input-error' : ''"
          placeholder="Type the term again"
        />
      </form>
    </div>
    <div class="flex gap-4">
      <template v-if="!failureMode">
        <button @click="handleFailure()" class="flex-1 btn">No</button>
        <button @click="handleSuccess()" class="flex-1 btn">Yes</button>
      </template>
      <template v-else>
        <button
          @click="showDetails = true"
          class="flex-1 btn"
          :class="wrongInput ? 'animate-pulse' : ''"
        >
          Details
        </button>
        <button @click="goNext()" class="flex-1 btn btn-primary">Next</button>
      </template>
    </div>
    <span
      v-if="config.timer !== null && !failureMode && !finished"
      class="inline-block h-1 rounded-full bg-primary shrink"
      :class="finished ? 'pause' : ''"
      :style="`--duration:${config.timer / 1000}s;`"
      :key="currentTerm.id"
    />
    <div class="flex flex-col text-sm text-left alert">
      <div class="space-y-4">
        <strong class="text-base">Pro tips</strong>
        <ul class="ml-4 space-y-2 list-disc">
          <li>
            Try to recall as many meanings, translations and example sentences as possible to answer
            properly
          </li>
          <li>If you doubt, better say No</li>
          <li>Be honest with your answers. If you lie, you're shooting yourself in the foot</li>
          <li>Don't just read it, say it out loud and talk to yourself</li>
          <li>If you don't remember it, focus on understanding it for next time (Take it easy)</li>
        </ul>
      </div>
    </div>
  </section>
  <BaseModal :show="showDetails && !finished" @close="showDetails = false">
    <TermDetails :term="currentTerm" hide-mutations />
  </BaseModal>
  <BaseModal :show="finished" @close="finished = false">
    <div class="space-y-4 text-center">
      <p class="text-2xl">Session Expired</p>
      <p>You're free to continue if you will or finish as you wished</p>
      <div class="flex gap-4">
        <button @click="handleFinish()" class="flex-1 btn btn-primary">Finish</button>
        <button @click="finished = false" class="flex-1 btn">Continue</button>
      </div>
    </div>
  </BaseModal>
</template>

<style>
@property --percentage {
  initial-value: 100%;
  inherits: false;
  syntax: '<percentage>';
}

@property --duration {
  initial-value: 10s;
  inherits: false;
  syntax: '<time>';
}

.chart {
  background: conic-gradient(oklch(var(--n)) var(--percentage), oklch(var(--nc)) 0);
  animation: timer var(--duration) linear forwards;
}

@keyframes timer {
  to {
    --percentage: 0%;
  }
}

.shrink {
  animation: shrink var(--duration) linear forwards;
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.pause {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}
</style>
