import { useLocalStorage } from '@vueuse/core';

type Sorting = 'alphabetically' | 'ascending' | 'descending';

export const sorting = useLocalStorage<Sorting>('sorting', 'alphabetically');
