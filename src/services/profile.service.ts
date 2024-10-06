import { profile } from '@/data';
import type { Collection, Word } from '@/types';
import { nanoid } from 'nanoid';

export interface CreateUpdateCollection {
  name: string;
  description: string;
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
      translations: [],
      createdAt: new Date()
    };

    for (const collection of profile.value.collections) {
      if (collection.id === collectionId) {
        collection.words.push(newWord);
        break;
      }
    }
  }

  removeWord(collectionId: string, wordId: string) {
    for (const collection of profile.value.collections) {
      if (collection.id === collectionId) {
        collection.words = collection.words.filter((word) => word.id !== wordId);
        break;
      }
    }
  }
}

export const profileService = new ProfileService();
