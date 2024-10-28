<script setup lang="ts">
import QuizResults from '@/components/QuizResults.vue';
import QuizSession from '@/components/QuizSession.vue';
import QuizStarter from '@/components/QuizStarter.vue';
import { currentVault } from '@/data';
import { useTermStore } from '@/stores/term';
import type { QuizConfig, QuizResult } from '@/types';
import { useTimeout } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

const store = useTermStore();

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

const hasTerms = computed(() => currentVault.value.collections.some((c) => c.terms.length > 0));
</script>

<template>
  <main
    v-if="store.hasToLearn || config !== null || result !== null"
    class="max-w-md w-full p-6 mx-auto"
  >
    <QuizStarter v-if="config === null" @config="(data) => (config = data)" />
    <template v-else-if="result === null">
      <div v-if="!ready" class="absolute inset-0 flex justify-center items-center">
        <span class="loading loading-ring loading-lg" />
      </div>
      <QuizSession v-else :config @finish="(data) => (result = data)" />
    </template>
    <QuizResults v-else :result @reset="reset" />
  </main>
  <div v-else class="max-w-sm mx-auto w-full text-center space-y-6 p-4 mt-4">
    <div class="space-y-4">
      <p class="font-semibold text-2xl">Nothing to practice right now</p>
      <p class="text-xl">Come back later!</p>
    </div>
    <RouterLink to="/" class="btn rounded-full"> Home </RouterLink>
    <div v-if="hasTerms" class="alert text-left flex flex-col text-sm">
      <div class="space-y-2">
        <strong class="text-base">Cooldown</strong>
        <p>
          Terms have a dynamic cooldown time in order to be used in a Quiz. Leaving some time
          between them helps with memorization.
        </p>
        <p>
          Newly added terms are not worth to be asked immediately, so they have a cooldown of 1
          hour.
        </p>
      </div>
      <div class="space-y-2">
        <strong class="text-base">Pro tip</strong>
        <p>
          Keep adding more terms and learn about them before Quizzing. The point is they will
          eventually come out when you don't expect them!
        </p>
      </div>
    </div>
  </div>
</template>
