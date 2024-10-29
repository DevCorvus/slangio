import { currentVault } from '@/data';
import type {
  Collection,
  PartOfSpeech,
  Term,
  TermMeaning,
  TermMetadata,
  TermReference
} from '@/types';
import { nanoid } from 'nanoid';
import { quizService } from './quiz.service';
import { cloneObject } from '@/utils/clone';

export interface CreateUpdateCollection {
  name: string;
  description: string;
}

export interface CreateTerm {
  content: string;
  meanings?: CreateUpdateTermMeaning[];
  references?: CreateUpdateTermReference[];
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

export interface CreateUpdateTermReference {
  url: string;
  name: string;
}

class VaultService {
  addCollection(data: CreateUpdateCollection): Collection {
    if (this.collectionExistsByName(data.name)) {
      throw new Error('Collection already exists');
    }

    const newCollection: Collection = {
      id: nanoid(),
      name: data.name,
      description: data.description,
      terms: [],
      createdAt: new Date()
    };

    currentVault.value.collections.push(newCollection);

    return newCollection;
  }

  getCollectionById(collectionId: string): Collection | null {
    return (
      currentVault.value.collections.find((collection) => collection.id === collectionId) || null
    );
  }

  collectionExistsByName(name: string) {
    const lowerName = name.toLowerCase();

    return currentVault.value.collections.some(
      (collection) => collection.name.toLowerCase() === lowerName
    );
  }

  updateCollection(collectionId: string, data: CreateUpdateCollection) {
    if (this.collectionExistsByName(data.name)) {
      throw new Error('Collection already exists');
    }

    currentVault.value.collections = cloneObject(
      currentVault.value.collections.map((collection) => {
        if (collection.id === collectionId) {
          collection.name = data.name;
          collection.description = data.description;
        }
        return collection;
      })
    );
  }

  removeCollection(collectionId: string) {
    currentVault.value.collections = cloneObject(
      currentVault.value.collections.filter((collection) => collection.id !== collectionId)
    );

    if (collectionId === currentVault.value.defaultCollection) {
      const permanentCollection = currentVault.value.collections.find(
        (collection) => collection.permanent
      );

      if (permanentCollection) {
        currentVault.value.defaultCollection = permanentCollection.id;
      }
    }
  }

  addTerm(collectionId: string, data: CreateTerm): Term {
    const collection = this.getCollectionById(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (this.termExistsByContent(data.content)) {
      throw new Error('Term already exists');
    }

    let meanings: TermMeaning[] = [];
    let references: TermReference[] = [];

    if (data.meanings) {
      meanings = data.meanings.map((meaning) => ({ id: nanoid(), ...meaning }));
    }

    if (data.references) {
      references = data.references.map((reference) => ({
        id: nanoid(),
        ...reference
      }));
    }

    const newTerm: Term = {
      id: nanoid(),
      content: data.content,
      meanings,
      references,
      metadata: {
        quiz: quizService.getDefault()
      },
      learnedAt: null,
      createdAt: new Date()
    };

    collection.terms.push(newTerm);

    return newTerm;
  }

  termExistsByContent(content: string) {
    const lowerContent = content.toLowerCase();

    return currentVault.value.collections.some((collection) =>
      collection.terms.some((term) => term.content.toLowerCase() === lowerContent)
    );
  }

  getCollectionIdFromTerm(termId: string): string | null {
    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          return collection.id;
        }
      }
    }

    return null;
  }

  updateTerm(termId: string, data: UpdateTerm) {
    if (this.termExistsByContent(data.content)) {
      throw new Error('Term already exists');
    }

    for (const collection of currentVault.value.collections) {
      collection.terms.forEach((term, i) => {
        if (term.id === termId) {
          term.content = data.content;

          if (collection.id !== data.collectionId) {
            // Move to another collection
            const termToMove = collection.terms.splice(i, 1)[0];

            for (const destinationCollection of currentVault.value.collections) {
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
    for (const collection of currentVault.value.collections) {
      const termIndex = collection.terms.findIndex((term) => term.id === termId);

      if (termIndex !== -1) {
        collection.terms.splice(termIndex, 1);
        return;
      }
    }
  }

  removeManyTerms(collectionId: string, termIds: string[]) {
    const collection = currentVault.value.collections.find(
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
    const sourceCollection = currentVault.value.collections.find(
      (collection) => collection.id === sourceCollectionId
    );

    const targetCollection = currentVault.value.collections.find(
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

    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          term.meanings.push(newTermMeaning);
          return;
        }
      }
    }
  }

  updateTermMeaning(termId: string, meaningId: string, data: CreateUpdateTermMeaning) {
    for (const collection of currentVault.value.collections) {
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
    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          const meaningIndex = term.meanings.findIndex((meaning) => meaning.id === meaningId);
          term.meanings.splice(meaningIndex, 1);
          return;
        }
      }
    }
  }

  addTermReference(termId: string, data: CreateUpdateTermReference) {
    const newReference: TermReference = {
      id: nanoid(),
      url: data.url,
      name: data.name
    };

    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          term.references.push(newReference);
          return;
        }
      }
    }
  }

  updateTermReference(termId: string, referenceId: string, data: CreateUpdateTermReference) {
    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          for (const reference of term.references) {
            if (reference.id === referenceId) {
              reference.url = data.url;
              reference.name = data.name;
              return;
            }
          }
          return;
        }
      }
    }
  }

  removeTermReference(termId: string, referenceId: string) {
    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          const referenceIndex = term.references.findIndex(
            (reference) => reference.id === referenceId
          );
          term.references.splice(referenceIndex, 1);
          return;
        }
      }
    }
  }

  setTermMetadata(termId: string, data: TermMetadata) {
    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          term.metadata = data;
          return;
        }
      }
    }
  }

  setTermLearnedState(termId: string, newState: boolean) {
    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          term.learnedAt = newState ? new Date() : null;
          return;
        }
      }
    }
  }
}

export const vaultService = new VaultService();
