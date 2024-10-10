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
  words: Word[];
  createdAt: Date;
}

export interface Word {
  id: string;
  content: string;
  meanings: WordMeaning[];
  createdAt: Date | string;
}

export type PartOfSpeech = (typeof EXTENDED_PARTS_OF_SPEECH)[number];

export interface WordMeaning {
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
