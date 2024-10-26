import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import type { Collection, Profile, SupportedLanguage } from './types';
import { nanoid } from 'nanoid';
import { getDaysInMs, getFutureDate } from './utils/time';
import { downloadJson } from './utils/download';
import { localeDateNow } from './utils/date';

const isDark = usePreferredDark();
export const theme = useLocalStorage('theme', isDark ? 'dark' : 'light');

export const firstTime = useLocalStorage<boolean>('firstTime', true);

type Sorting = 'alphabetically' | 'ascending' | 'descending';
export const sorting = useLocalStorage<Sorting>('sorting', 'alphabetically');

export const quizConfig = useLocalStorage('quizConfig', {
  maxTerms: 100,
  maxDuration: 0,
  timer: 0
});

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

export const nextProfileExportReminder = useLocalStorage(
  'nextProfileExport',
  getFutureDate(getDaysInMs(7))
);

export function exportProfiles() {
  const allProfiles = [...profiles.value, profile.value];
  downloadJson(`slangio_profiles.${localeDateNow()}`, allProfiles);
  nextProfileExportReminder.value = getFutureDate(getDaysInMs(7));
}
