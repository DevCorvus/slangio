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

export interface Word {
  id: string;
  content: string;
  meanings: string[] | null;
  translations: string[] | null;
  createdAt: Date;
}
