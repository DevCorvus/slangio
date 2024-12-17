import { useLocalStorage } from '@vueuse/core';

export const firstTime = useLocalStorage<boolean>('firstTime', true);
