import { currentVault } from '@/data';
import { isValidQuizTerm } from '@/utils/term';
import { getMinutesInMs } from '@/utils/time';
import { useInterval } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTermStore = defineStore('term', () => {
  const getToLearn = () => {
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
  };

  const toLearn = ref(getToLearn());

  const refreshToLearn = () => {
    toLearn.value = getToLearn();
  };

  useInterval(getMinutesInMs(1), {
    callback: refreshToLearn
  });

  const hasToLearn = computed(() => {
    for (const collectionId in toLearn.value) {
      if (toLearn.value[collectionId] > 0) return true;
    }
    return false;
  });

  return { toLearn, hasToLearn, refreshToLearn };
});
