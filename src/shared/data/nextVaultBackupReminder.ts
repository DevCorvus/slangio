import { useLocalStorage } from '@vueuse/core';
import { getDaysInMs, getFutureDate } from '@/shared/utils/time';

export const nextVaultBackupReminder = useLocalStorage(
  'nextVaultBackup',
  getFutureDate(getDaysInMs(7))
);
