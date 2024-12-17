import { useLocalStorage, usePreferredDark } from '@vueuse/core';

const isDark = usePreferredDark();

export const theme = useLocalStorage('theme', isDark ? 'dark' : 'light');
