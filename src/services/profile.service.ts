import { profile } from '@/data';
import type { Collection, PartOfSpeech, Word, WordMeaning } from '@/types';
import { nanoid } from 'nanoid';

export interface CreateUpdateCollection {
  name: string;
  description: string;
}

export interface CreateUpdateWordMeaning {
  partOfSpeech: PartOfSpeech;
  content: string;
  example: string;
}

class ProfileService {
  addCollection(data: CreateUpdateCollection) {
    const newCollection: Collection = {
      id: nanoid(),
      name: data.name,
      description: data.description,
      words: [],
      createdAt: new Date()
    };

    profile.value.collections.push(newCollection);
  }

  updateCollection(collectionId: string, data: CreateUpdateCollection) {
    profile.value.collections = profile.value.collections.map((collection) => {
      if (collection.id === collectionId) {
        collection.name = data.name;
        collection.description = data.description;
      }
      return collection;
    });
  }

  removeCollection(collectionId: string) {
    profile.value.collections = profile.value.collections.filter(
      (collection) => collection.id !== collectionId
    );

    if (collectionId === profile.value.defaultCollection) {
      profile.value.defaultCollection = profile.value.collections[0].id;
    }
  }

  addWord(collectionId: string, content: string) {
    const newWord: Word = {
      id: nanoid(),
      content,
      meanings: [],
      createdAt: new Date()
    };

    for (const collection of profile.value.collections) {
      if (collection.id === collectionId) {
        collection.words.push(newWord);
        break;
      }
    }
  }

  removeWord(wordId: string) {
    for (const collection of profile.value.collections) {
      const wordIndex = collection.words.findIndex((word) => word.id === wordId);

      if (wordIndex !== -1) {
        collection.words.splice(wordIndex, 1);
        break;
      }
    }
  }

  addWordMeaning(wordId: string, data: CreateUpdateWordMeaning) {
    const newWordMeaning: WordMeaning = {
      id: nanoid(),
      partOfSpeech: data.partOfSpeech,
      content: data.content,
      example: data.example
    };

    for (const collection of profile.value.collections) {
      for (const word of collection.words) {
        if (word.id === wordId) {
          word.meanings.push(newWordMeaning);
          break;
        }
      }
    }
  }

  updateWordMeaning(wordId: string, meaningId: string, data: CreateUpdateWordMeaning) {
    for (const collection of profile.value.collections) {
      for (const word of collection.words) {
        if (word.id === wordId) {
          for (const meaning of word.meanings) {
            if (meaning.id === meaningId) {
              meaning.partOfSpeech = data.partOfSpeech;
              meaning.content = data.content;
              meaning.example = data.example;
              break;
            }
          }
          break;
        }
      }
    }
  }

  removeWordMeaning(wordId: string, meaningId: string) {
    for (const collection of profile.value.collections) {
      for (const word of collection.words) {
        if (word.id === wordId) {
          const meaningIndex = word.meanings.findIndex((meaning) => meaning.id === meaningId);
          word.meanings.splice(meaningIndex, 1);
          break;
        }
      }
    }
  }
}

export const profileService = new ProfileService();
