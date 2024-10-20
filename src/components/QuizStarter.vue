<script setup lang="ts">
import { quizConfig } from '@/data';
import type { Collection, QuizConfig } from '@/types';
import { isValidQuizTerm } from '@/utils/term';
import { getMinutesInMs, getSecondsInMs } from '@/utils/time';
import { computed, reactive, type ComputedRef } from 'vue';

const props = defineProps<{
  collections: Collection[];
}>();

const emit = defineEmits<{
  (e: 'config', data: QuizConfig): void;
}>();

const totalValidTermsCount = computed(() => {
  const out: { [key: string]: number } = {};

  for (const collection of props.collections) {
    out[collection.id] = collection.terms.reduce((prev, term) => {
      return isValidQuizTerm(term) ? prev + 1 : prev;
    }, 0);
  }

  return out;
});

const selectedCollection: ComputedRef<Collection> = computed(
  () => props.collections.find((collection) => collection.id === formData.collectionId)!
);

const validTerms = computed(() => selectedCollection.value.terms.filter(isValidQuizTerm));

const formData = reactive({
  collectionId: props.collections[0].id,
  maxTerms: quizConfig.value.maxTerms,
  maxDuration: quizConfig.value.maxDuration,
  timer: quizConfig.value.timer
});

const handleMaxTermsChange = (e: Event) => {
  const value = parseInt((e.target as HTMLInputElement).value);

  if (isNaN(value)) {
    formData.maxTerms = 1;
  } else {
    formData.maxTerms = Math.max(1, value);
  }
};

const handleMaxTermsBlur = (e: Event) => {
  (e.target as HTMLInputElement).value = String(formData.maxTerms);
};

const handleSubmit = () => {
  quizConfig.value.maxTerms = formData.maxTerms;
  quizConfig.value.maxDuration = formData.maxDuration;
  quizConfig.value.timer = formData.timer;

  const numberOfTerms = Math.min(
    totalValidTermsCount.value[selectedCollection.value.id],
    formData.maxTerms
  );

  const terms = validTerms.value.slice(0, numberOfTerms);

  terms.sort((a, b) => {
    const aPriority = a.metadata.quiz.priority;
    const bPriority = b.metadata.quiz.priority;

    const priorityFactor = bPriority - aPriority;

    if (priorityFactor === 0) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return priorityFactor;
    }
  });

  emit('config', {
    collectionName: selectedCollection.value.name,
    terms,
    duration: getMinutesInMs(formData.maxDuration) || null,
    timer: getSecondsInMs(formData.timer) || null
  });
};
</script>

<template>
  <section class="space-y-6">
    <header class="text-3xl font-bold flex items-center gap-4">
      <h1>Quiz</h1>
    </header>
    <form @submit.prevent="handleSubmit()" class="space-y-8">
      <div class="space-y-2">
        <div class="flex justify-between gap-6">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Collection</span>
            </div>
            <select v-model="formData.collectionId" class="select select-bordered">
              <option v-for="collection in collections" :value="collection.id" :key="collection.id">
                ({{ totalValidTermsCount[collection.id] }}) {{ collection.name }}
              </option>
            </select>
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Max terms</span>
            </div>
            <input
              type="number"
              @input="handleMaxTermsChange"
              @blur="handleMaxTermsBlur"
              :value="formData.maxTerms"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div class="flex justify-between gap-4">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Max duration</span>
            </div>
            <select v-model="formData.maxDuration" class="select select-bordered">
              <option selected :value="0">No limit</option>
              <option :value="5">5 minutes</option>
              <option :value="10">10 minutes</option>
              <option :value="15">15 minutes</option>
              <option :value="20">20 minutes</option>
              <option :value="25">25 minutes</option>
              <option :value="30">30 minutes</option>
              <option :value="45">45 minutes</option>
              <option :value="60">60 minutes</option>
            </select>
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Timer per term</span>
            </div>
            <select v-model="formData.timer" class="select select-bordered">
              <option selected :value="0">None</option>
              <option :value="5">5 seconds</option>
              <option :value="10">10 seconds</option>
              <option :value="15">15 seconds</option>
            </select>
          </label>
        </div>
      </div>
      <button class="btn btn-block btn-primary">Start</button>
    </form>
  </section>
</template>
