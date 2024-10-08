import { EXTENDED_PARTS_OF_SPEECH } from './constants';

type TargetSourceOptions = 'en' | 'es';

export interface Profile {
  source: TargetSourceOptions;
  target: TargetSourceOptions;
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

export type PartOfSpeech = (typeof EXTENDED_PARTS_OF_SPEECH)[number];

export interface WordMeaning {
  id: string;
  partOfSpeech: PartOfSpeech;
  content: string;
  example: string;
}

export interface Word {
  id: string;
  content: string;
  meanings: WordMeaning[];
  createdAt: Date | string;
}
