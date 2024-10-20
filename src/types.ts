import type { SUPPORTED_LANGUAGES } from './config/languages';
import { EXTENDED_PARTS_OF_SPEECH } from './constants';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface Profile {
  id: string;
  name?: string;
  source: SupportedLanguage;
  target: SupportedLanguage;
  collections: Collection[];
  defaultCollection: string;
  createdAt: Date | string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  terms: Term[];
  permanent?: boolean;
  createdAt: Date | string;
}

export interface Term {
  id: string;
  content: string;
  meanings: TermMeaning[];
  references: TermReference[];
  metadata: TermMetadata;
  learnedAt: null | Date | string;
  createdAt: Date | string;
}

export type PartOfSpeech = (typeof EXTENDED_PARTS_OF_SPEECH)[number];

export interface TermMeaning {
  id: string;
  partOfSpeech: PartOfSpeech;
  content: string;
  example: string;
}

export interface TermReference {
  id: string;
  url: string;
  name: string;
}

export interface TermMetadata {
  quiz: TermQuizMetadata;
}

export interface TermQuizMetadata {
  priority: number;
  stage: number;
  cooldown: Date | string;
  record: [number, number];
}

export interface LanguageReference {
  text: string;
  about: string;
  buildUrl(term: string): string;
}

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
