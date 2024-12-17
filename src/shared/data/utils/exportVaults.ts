import { localeDateNow } from '@/shared/utils/date';
import { downloadJson } from '@/shared/utils/download';
import { getDaysInMs, getFutureDate } from '@/shared/utils/time';
import { nextVaultBackupReminder } from '../nextVaultBackupReminder';
import { vaults } from '../vaults';
import { currentVault } from '../currentVault';

export function exportVaults() {
  const allVaults = [...vaults.value, currentVault.value];
  downloadJson(`slangio_vaults.${localeDateNow()}`, allVaults);
  nextVaultBackupReminder.value = getFutureDate(getDaysInMs(7));
}
