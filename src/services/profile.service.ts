import { profile } from '@/data';
import type { Collection, PartOfSpeech, Term, TermMeaning } from '@/types';
import { nanoid } from 'nanoid';

export interface CreateUpdateCollection {
  name: string;
  description: string;
}

export interface UpdateTerm {
  collectionId: string;
  content: string;
}

export interface CreateUpdateTermMeaning {
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
      terms: [],
      createdAt: new Date()
    };

    profile.value.collections.push(newCollection);
  }

  doesCollectionAlreadyExists(name: string) {
    const lowerName = name.toLowerCase();

    return profile.value.collections.some(
      (collection) => collection.name.toLowerCase() === lowerName
    );
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

  addTerm(collectionId: string, content: string) {
    const newTerm: Term = {
      id: nanoid(),
      content,
      meanings: [],
      createdAt: new Date()
    };

    for (const collection of profile.value.collections) {
      if (collection.id === collectionId) {
        collection.terms.push(newTerm);
        return;
      }
    }
  }

  doesTermAlreadyExists(content: string) {
    const lowerContent = content.toLowerCase();

    return profile.value.collections.some((collection) =>
      collection.terms.some((term) => term.content.toLowerCase() === lowerContent)
    );
  }

  getCollectionIdFromTerm(termId: string): string | null {
    for (const collection of profile.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          return collection.id;
        }
      }
    }

    return null;
  }

  updateTerm(termId: string, data: UpdateTerm) {
    for (const collection of profile.value.collections) {
      collection.terms.forEach((term, i) => {
        if (term.id === termId) {
          term.content = data.content;

          if (collection.id !== data.collectionId) {
            // Move to another collection
            const termToMove = collection.terms.splice(i, 1)[0];

            for (const destinationCollection of profile.value.collections) {
              if (destinationCollection.id === data.collectionId) {
                destinationCollection.terms.push(termToMove);
                return;
              }
            }
          }
          return;
        }
      });
    }
  }

  removeTerm(termId: string) {
    for (const collection of profile.value.collections) {
      const termIndex = collection.terms.findIndex((term) => term.id === termId);

      if (termIndex !== -1) {
        collection.terms.splice(termIndex, 1);
        return;
      }
    }
  }

  removeManyTerms(collectionId: string, termIds: string[]) {
    const collection = profile.value.collections.find(
      (collection) => collection.id === collectionId
    );

    if (collection) {
      for (const termId of termIds) {
        const termIndex = collection.terms.findIndex((term) => term.id === termId);

        if (termIndex !== -1) {
          collection.terms.splice(termIndex, 1);
        }
      }
    }
  }

  moveManyTerms(sourceCollectionId: string, targetCollectionId: string, termIds: string[]) {
    const sourceCollection = profile.value.collections.find(
      (collection) => collection.id === sourceCollectionId
    );

    const targetCollection = profile.value.collections.find(
      (collection) => collection.id === targetCollectionId
    );

    if (sourceCollection && targetCollection) {
      for (const termId of termIds) {
        const termIndex = sourceCollection.terms.findIndex((term) => term.id === termId);

        if (termIndex !== -1) {
          const termToMove = sourceCollection.terms.splice(termIndex, 1)[0];
          targetCollection.terms.push(termToMove);
        }
      }
    }
  }

  addTermMeaning(termId: string, data: CreateUpdateTermMeaning) {
    const newTermMeaning: TermMeaning = {
      id: nanoid(),
      partOfSpeech: data.partOfSpeech,
      content: data.content,
      example: data.example
    };

    for (const collection of profile.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          term.meanings.push(newTermMeaning);
          break;
        }
      }
    }
  }

  updateTermMeaning(termId: string, meaningId: string, data: CreateUpdateTermMeaning) {
    for (const collection of profile.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          for (const meaning of term.meanings) {
            if (meaning.id === meaningId) {
              meaning.partOfSpeech = data.partOfSpeech;
              meaning.content = data.content;
              meaning.example = data.example;
              return;
            }
          }
          return;
        }
      }
    }
  }

  removeTermMeaning(termId: string, meaningId: string) {
    for (const collection of profile.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          const meaningIndex = term.meanings.findIndex((meaning) => meaning.id === meaningId);
          term.meanings.splice(meaningIndex, 1);
          return;
        }
      }
    }
  }
}

export const profileService = new ProfileService();
