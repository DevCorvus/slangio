import type { Term } from '@/shared/types/term';

export interface Collection {
  id: string;
  name: string;
  description: string;
  terms: Term[];
  permanent?: boolean;
  createdAt: Date | string;
}
