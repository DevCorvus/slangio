<script setup lang="ts">
import QuizResults from '@/components/QuizResults.vue';
import QuizSession from '@/components/QuizSession.vue';
import QuizStarter from '@/components/QuizStarter.vue';
import { useTermStore } from '@/stores/term';
import type { QuizConfig, QuizResult } from '@/types';
import { useTimeout } from '@vueuse/core';
import { onBeforeMount, ref, watch } from 'vue';

const store = useTermStore();

onBeforeMount(store.refreshToLearn);

const config = ref<QuizConfig | null>(null);
const result = ref<QuizResult | null>(null);

const { ready, start } = useTimeout(3000, {
  immediate: false,
  controls: true
});

watch(config, () => {
  if (config.value?.timer) start();
});

const reset = () => {
  config.value = null;
  result.value = null;
};
</script>

<template>
  <main v-if="store.hasToLearn || result !== null" class="max-w-md w-full p-10 mx-auto">
    <QuizStarter v-if="config === null" @config="(data) => (config = data)" />
    <template v-else-if="result === null">
      <div v-if="!ready" class="absolute inset-0 flex justify-center items-center">
        <span class="loading loading-ring loading-lg" />
      </div>
      <QuizSession v-else :config @finish="(data) => (result = data)" />
    </template>
    <QuizResults v-else :result @reset="reset" />
  </main>
  <div v-else class="absolute inset-0 flex items-center justify-center min-h-screen">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="space-y-2">
        <p class="font-semibold text-2xl">Nothing to practice right now</p>
        <p class="text-xl">Come back later!</p>
      </div>
      <div>
        <RouterLink to="/" class="btn btn-sm">Home</RouterLink>
      </div>
    </div>
  </div>
</template>
