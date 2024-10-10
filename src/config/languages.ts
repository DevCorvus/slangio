import type { Reference, SourceTargetOptions } from '@/types';

type LanguageConfiguration = {
  [Source in SourceTargetOptions]?: {
    [Target in Exclude<SourceTargetOptions, Source>]?: {
      references: Reference[];
    };
  };
};

export const LanguageConfig: LanguageConfiguration = {
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
