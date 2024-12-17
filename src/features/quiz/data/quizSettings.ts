import { useLocalStorage } from '@vueuse/core';

export const quizSettings = useLocalStorage('quizSettings', {
  maxTerms: 50,
  maxDuration: 0,
  timer: 0
});
