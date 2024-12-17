import type { TermQuizMetadata } from '@/features/quiz/types';
import type { PartOfSpeech } from '@/shared/types';

export interface Term {
  id: string;
  content: string;
  sentences: string[];
  meanings: TermMeaning[];
  references: TermReference[];
  metadata: TermMetadata;
  learnedAt: null | Date | string;
  createdAt: Date | string;
}

export interface TermMeaning {
  partOfSpeech: PartOfSpeech;
  content: string;
  example: string;
}

export interface TermReference {
  url: string;
  name: string;
}

export interface TermMetadata {
  quiz: TermQuizMetadata;
}
