<script setup lang="ts">
import { vaultService } from '@/services/vault.service';
import { quizService } from '@/services/quiz.service';
import type { QuizConfig, QuizResult, Term } from '@/types';
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import TermDetails from './TermDetails.vue';
import ModalComponent from './ModalComponent.vue';
import { useTimeout } from '@vueuse/core';
import { useTermStore } from '@/stores/term';

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

const store = useTermStore();

onBeforeUnmount(() => {
  if (timeoutId.value) clearTimeout(timeoutId.value);
  store.refreshToLearn();
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
      <header class="font-semibold justify-center">
        <h1>{{ config.collectionName }}</h1>
      </header>
      <div>
        <div class="relative">
          <div class="text-lg font-bold flex items-center justify-center gap-2 select-none">
            <span>{{ config.terms.length - terms.length }}</span>
            <span>/</span>
            <span>{{ config.terms.length }}</span>
          </div>
          <div
            v-if="config.duration !== null"
            class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-56 flex items-center justify-end"
          >
            <span
              class="chart size-4 rounded-full tooltip"
              :style="`--duration:${config.duration / 1000}s;`"
              data-tip="Max Duration"
            />
          </div>
        </div>
        <progress
          class="progress w-56"
          :value="config.terms.length - terms.length"
          :max="config.terms.length"
        />
      </div>
    </div>
    <div class="space-y-6">
      <template v-if="!failureMode">
        <p>Do you remember this term?</p>
        <span class="inline-block text-3xl font-bold">{{ currentTerm.content }}</span>
        <p class="text-base-content/50 text-sm">Say it out loud</p>
      </template>
      <form v-else @submit.prevent="goNext()">
        <input
          ref="repeat"
          type="text"
          v-model.trim="input"
          class="input input-bordered w-full text-center text-2xl"
          :class="wrongInput ? 'input-error' : ''"
          placeholder="Type the term again"
        />
      </form>
    </div>
    <div class="flex gap-4">
      <template v-if="!failureMode">
        <button @click="handleFailure()" class="btn flex-1">No</button>
        <button @click="handleSuccess()" class="btn flex-1">Yes</button>
      </template>
      <template v-else>
        <button
          @click="showDetails = true"
          class="btn flex-1"
          :class="wrongInput ? 'animate-pulse' : ''"
        >
          Details
        </button>
        <button @click="goNext()" class="btn btn-primary flex-1">Next</button>
      </template>
    </div>
    <span
      v-if="config.timer !== null && !failureMode && !finished"
      class="inline-block bg-primary shrink h-1 rounded-full"
      :class="finished ? 'pause' : ''"
      :style="`--duration:${config.timer / 1000}s;`"
      :key="currentTerm.id"
    />
    <div class="alert text-left flex flex-col text-sm">
      <div class="space-y-4">
        <strong class="text-base">Pro tips</strong>
        <ul class="list-disc ml-4 space-y-2">
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
  <ModalComponent :show="showDetails && !finished" @close="showDetails = false">
    <TermDetails :term="currentTerm" hide-mutations />
  </ModalComponent>
  <ModalComponent :show="finished" @close="finished = false">
    <div class="text-center space-y-4">
      <p class="text-2xl">Session Expired</p>
      <p>You're free to continue if you will or finish as you wished</p>
      <div class="flex gap-4">
        <button @click="handleFinish()" class="btn btn-primary flex-1">Finish</button>
        <button @click="finished = false" class="btn flex-1">Continue</button>
      </div>
    </div>
  </ModalComponent>
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
