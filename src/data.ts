import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import type { Collection, Profile, SupportedLanguage } from './types';
import { nanoid } from 'nanoid';

const isDark = usePreferredDark();
export const theme = useLocalStorage('theme', isDark ? 'dark' : 'light');

type Sorting = 'alphabetically' | 'ascending' | 'descending';
export const sorting = useLocalStorage<Sorting>('sorting', 'alphabetically');

export const firstTime = useLocalStorage<boolean>('firstTime', true);

export interface CreateUpdateProfile {
  source: SupportedLanguage;
  target: SupportedLanguage;
}

export function createProfile({ source, target }: CreateUpdateProfile) {
  const defaultCollection: Collection = {
    id: nanoid(),
    name: 'Default',
    description: '',
    terms: [],
    permanent: true,
    createdAt: new Date()
  };

  const newProfile: Profile = {
    id: nanoid(),
    source,
    target,
    collections: [defaultCollection],
    defaultCollection: defaultCollection.id,
    createdAt: new Date()
  };

  return newProfile;
}

const defaultProfile = createProfile({ source: 'en', target: 'en' });

export const profile = useLocalStorage<Profile>('profile', defaultProfile);
export const profiles = useLocalStorage<Profile[]>('profiles', []);
