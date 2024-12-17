import type { Term } from '@/shared/types/term';

export interface QuizConfig {
  collectionName: string;
  terms: Term[];
  duration: number | null;
  timer: number | null;
}

export interface QuizResult {
  collectionName: string;
  termsTested: {
    yes: Term[];
    no: Term[];
  };
}

export interface TermQuizMetadata {
  priority: number;
  stage: number;
  cooldown: Date | string;
  record: [number, number];
}
