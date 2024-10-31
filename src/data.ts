import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import type { Collection, Vault, SupportedLanguage } from './types';
import { nanoid } from 'nanoid';
import { getDaysInMs, getFutureDate } from './utils/time';
import { downloadJson } from './utils/download';
import { localeDateNow } from './utils/date';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';

const isDark = usePreferredDark();
export const theme = useLocalStorage('theme', isDark ? 'dark' : 'light');

export const firstTime = useLocalStorage<boolean>('firstTime', true);

type Sorting = 'alphabetically' | 'ascending' | 'descending';
export const sorting = useLocalStorage<Sorting>('sorting', 'alphabetically');

interface Settings {
  openNewTermDetails: boolean;
}

export const settings = useLocalStorage<Settings>('settings', { openNewTermDetails: false });

export const quizConfig = useLocalStorage('quizConfig', {
  maxTerms: 100,
  maxDuration: 0,
  timer: 0
});

export interface CreateUpdateVault {
  source: SupportedLanguage;
  target: SupportedLanguage;
}

export function createVault({ source, target }: CreateUpdateVault) {
  const defaultCollection: Collection = {
    id: nanoid(),
    name: 'Default',
    description: '',
    terms: [],
    permanent: true,
    createdAt: new Date()
  };

  const newVault: Vault = {
    id: nanoid(),
    source,
    target,
    collections: [defaultCollection],
    defaultCollection: defaultCollection.id,
    createdAt: new Date()
  };

  return newVault;
}

const defaultVault = createVault({ source: 'en', target: 'en' });

export const { data: currentVault, isFinished: currentVaultLoaded } = useIDBKeyval<Vault>(
  'currentVault',
  defaultVault
);
export const { data: vaults, isFinished: vaultsLoaded } = useIDBKeyval<Vault[]>('vaults', []);

export const nextVaultBackupReminder = useLocalStorage(
  'nextVaultBackup',
  getFutureDate(getDaysInMs(7))
);

export function exportVaults() {
  const allVaults = [...vaults.value, currentVault.value];
  downloadJson(`slangio_vaults.${localeDateNow()}`, allVaults);
  nextVaultBackupReminder.value = getFutureDate(getDaysInMs(7));
}
