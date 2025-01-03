import { isValidQuizTerm } from '@/shared/utils/term';
import { getMinutesInMs } from '@/shared/utils/time';
import { useInterval } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { currentVault } from '../data/currentVault';

export const useTermStore = defineStore('term', () => {
  const trigger = ref(false);

  const toLearn = computed(() => {
    trigger.value;

    const out: { [key: string]: number } = {};

    for (const collection of currentVault.value.collections) {
      out[collection.id] = collection.terms.reduce((prev, term) => {
        if (isValidQuizTerm(term)) {
          return prev + 1;
        }
        return prev;
      }, 0);
    }

    return out;
  });

  useInterval(getMinutesInMs(1), {
    callback: () => {
      trigger.value = !trigger.value;
    }
  });

  const hasToLearn = computed(() => {
    for (const collectionId in toLearn.value) {
      if (toLearn.value[collectionId] > 0) return true;
    }
    return false;
  });

  return { toLearn, hasToLearn };
});
