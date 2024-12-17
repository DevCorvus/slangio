import { settings } from '@/shared/data/settings';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Term } from '../types/term';

export const useNewTermStore = defineStore('new-term', () => {
  const newTerm = ref<Term | null>(null);

  const setNewTerm = (data: Term) => {
    if (settings.value.openNewTermDetails) {
      newTerm.value = data;
    }
  };

  const reset = () => {
    newTerm.value = null;
  };

  return { newTerm, setNewTerm, reset };
});
