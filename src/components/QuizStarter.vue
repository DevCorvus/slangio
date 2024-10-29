<script setup lang="ts">
import { currentVault, quizConfig } from '@/data';
import { useTermStore } from '@/stores/term';
import type { Collection, QuizConfig } from '@/types';
import { isValidQuizTerm } from '@/utils/term';
import { getMinutesInMs, getSecondsInMs } from '@/utils/time';
import { computed, reactive, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits<{
  (e: 'config', data: QuizConfig): void;
}>();

const route = useRoute();

const store = useTermStore();

const collections = computed(() => {
  const out = [];

  for (const collectionId in store.toLearn) {
    if (store.toLearn[collectionId] === 0) continue;

    const collection = currentVault.value.collections.find(
      (collection) => collection.id === collectionId
    );

    if (collection) {
      out.push(collection);
    }
  }

  return out;
});

const selectedCollection: ComputedRef<Collection> = computed(
  () => collections.value.find((collection) => collection.id === formData.collectionId)!
);

const validTerms = computed(() => selectedCollection.value.terms.filter(isValidQuizTerm));

const formData = reactive({
  collectionId:
    route.query.collectionId && store.toLearn[route.query.collectionId as string] > 0
      ? (route.query.collectionId as string)
      : collections.value[0].id,
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

  const numberOfTerms = Math.min(store.toLearn[selectedCollection.value.id], formData.maxTerms);

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
    <p>A simple Yes or No type Quiz to recall terms</p>
    <form @submit.prevent="handleSubmit()" class="space-y-8">
      <div class="grid md:grid-cols-2 gap-2 md:gap-4">
        <label class="form-control">
          <div class="label">
            <span class="label-text">Collection</span>
          </div>
          <select v-model="formData.collectionId" class="select select-bordered">
            <option v-for="collection in collections" :value="collection.id" :key="collection.id">
              ({{ store.toLearn[collection.id] }}) {{ collection.name }}
            </option>
          </select>
        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Max terms</span>
          </div>
          <input
            type="number"
            @input="handleMaxTermsChange"
            @blur="handleMaxTermsBlur"
            :value="formData.maxTerms"
            class="input input-bordered"
          />
        </label>
        <label class="form-control">
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
        <label class="form-control">
          <div class="label">
            <span class="label-text">Timer per term</span>
          </div>
          <select v-model="formData.timer" class="select select-bordered">
            <option selected :value="0">No timer</option>
            <option :value="5">5 seconds</option>
            <option :value="10">10 seconds</option>
            <option :value="15">15 seconds</option>
            <option :value="20">20 seconds</option>
            <option :value="25">25 seconds</option>
            <option :value="30">30 seconds</option>
          </select>
        </label>
      </div>
      <button class="btn btn-block btn-primary">Start</button>
    </form>
    <div class="alert text-left flex flex-col text-sm">
      <div class="space-y-4">
        <strong class="text-base">Pro tip</strong>
        <p>
          Don't Quiz too much in a short period of time, know your limits. This is not a speedrun
          but a marathon. Let your brain sink in those terms with time, rest and lots of repetition.
        </p>
      </div>
    </div>
  </section>
</template>
