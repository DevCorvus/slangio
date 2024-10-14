import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import type { Collection, Profile } from './types';
import { nanoid } from 'nanoid';

const isDark = usePreferredDark();
export const theme = useLocalStorage('theme', isDark ? 'dark' : 'light');

type Sorting = 'alphabetically' | 'ascending' | 'descending';
export const sorting = useLocalStorage<Sorting>('sorting', 'alphabetically');

const DEFAULT_COLLECTION: Collection = {
  id: nanoid(),
  name: 'Default Collection',
  description: '',
  terms: [],
  createdAt: new Date()
};

const DEFAULT_PROFILE: Profile = {
  source: 'es',
  target: 'en',
  collections: [DEFAULT_COLLECTION],
  defaultCollection: DEFAULT_COLLECTION.id,
  createdAt: new Date()
};

export const profile = useLocalStorage('profile', DEFAULT_PROFILE);
