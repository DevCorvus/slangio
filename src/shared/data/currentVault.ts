import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Vault } from '../types/vault';
import { vaultService } from '../services/vault.service';

const defaultVault = vaultService.create({ source: 'en', target: 'en' });

export const { data: currentVault, isFinished: currentVaultLoaded } = useIDBKeyval<Vault>(
  'currentVault',
  defaultVault
);
