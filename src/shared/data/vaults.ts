import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Vault } from '../types/vault';

export const { data: vaults, isFinished: vaultsLoaded } = useIDBKeyval<Vault[]>('vaults', []);
