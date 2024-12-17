import type { SUPPORTED_LANGUAGES } from './config/languages';
import type { EXTENDED_PARTS_OF_SPEECH } from './constants';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type PartOfSpeech = (typeof EXTENDED_PARTS_OF_SPEECH)[number];

export interface LanguageReference {
  text: string;
  about: string;
  buildUrl(term: string): string;
}

export interface Settings {
  openNewTermDetails: boolean;
}
