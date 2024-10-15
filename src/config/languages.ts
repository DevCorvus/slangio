import type { Reference, SupportedLanguage } from '@/types';

export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;

type LanguageMetadata = {
  [Language in SupportedLanguage]: {
    name: string;
    flagIso: string;
  };
};

export const LANGUAGE_METADATA: LanguageMetadata = {
  en: {
    name: 'English',
    flagIso: 'gb'
  },
  es: {
    name: 'Spanish',
    flagIso: 'es'
  }
};

type LanguageConfiguration = {
  [Source in SupportedLanguage]?: {
    [Target in Exclude<SupportedLanguage, Source>]?: {
      references: Reference[];
    };
  };
};

export const LANGUAGE_CONFIG: LanguageConfiguration = {
  es: {
    en: {
      references: [
        {
          text: 'Linguee',
          about: 'Translations',
          buildUrl(term) {
            return 'https://www.linguee.com/english-spanish/search?source=auto&query=' + term;
          }
        },
        {
          text: 'Urbandictionary',
          about: 'Slangs',
          buildUrl(term) {
            return 'https://www.urbandictionary.com/define.php?term=' + term;
          }
        }
      ]
    }
  }
};
