import { EXTENDED_PARTS_OF_SPEECH } from './constants';

export type SourceTargetOptions = 'en' | 'es';

export interface Profile {
  source: SourceTargetOptions;
  target: SourceTargetOptions;
  collections: Collection[];
  defaultCollection: string;
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  terms: Term[];
  createdAt: Date;
}

export interface Term {
  id: string;
  content: string;
  meanings: TermMeaning[];
  createdAt: Date | string;
}

export type PartOfSpeech = (typeof EXTENDED_PARTS_OF_SPEECH)[number];

export interface TermMeaning {
  id: string;
  partOfSpeech: PartOfSpeech;
  content: string;
  example: string;
}

export interface Reference {
  text: string;
  about: string;
  buildUrl(term: string): string;
}
