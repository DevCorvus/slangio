import type { SupportedLanguage } from '@/shared/types';
import type { Collection } from './collection';

export interface Vault {
  id: string;
  name?: string;
  source: SupportedLanguage;
  target: SupportedLanguage;
  collections: Collection[];
  defaultCollection: string;
  createdAt: Date | string;
}
