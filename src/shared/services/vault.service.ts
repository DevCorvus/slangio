import { nanoid } from 'nanoid';
import { cloneObject } from '@/shared/utils/clone';
import type { Term, TermMeaning, TermMetadata, TermReference } from '@/shared/types/term';
import type { SupportedLanguage } from '@/shared/types';
import type { Collection } from '@/shared/types/collection';
import type { Vault } from '../types/vault';
import { currentVault } from '../data/currentVault';
import { quizService } from '@/features/quiz/services/quiz.service';

export interface CreateUpdateVault {
  source: SupportedLanguage;
  target: SupportedLanguage;
}

export interface CreateUpdateCollection {
  name: string;
  description: string;
}

export interface CreateTerm {
  content: string;
  sentences?: string[];
  meanings?: TermMeaning[];
  references?: TermReference[];
}

export interface UpdateTerm {
  collectionId: string;
  content: string;
}

class VaultService {
  create({ source, target }: CreateUpdateVault) {
    const defaultCollection: Collection = {
      id: nanoid(),
      name: 'Default',
      description: '',
      terms: [],
      permanent: true,
      createdAt: new Date()
    };

    const newVault: Vault = {
      id: nanoid(),
      source,
      target,
      collections: [defaultCollection],
      defaultCollection: defaultCollection.id,
      createdAt: new Date()
    };

    return newVault;
  }
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
    const collection = this.getCollectionById(collectionId);

    if (collection) {
      if (
        collection.name.toLowerCase() !== data.name.toLowerCase() &&
        this.collectionExistsByName(data.name)
      ) {
        throw new Error('Collection already exists');
      }

      collection.name = data.name;
      collection.description = data.description;
    }
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

    const newTerm: Term = {
      id: nanoid(),
      content: data.content,
      sentences: data.sentences || [],
      meanings: data.meanings || [],
      references: data.references || [],
      metadata: {
        quiz: quizService.getDefault()
      },
      learnedAt: null,
      createdAt: new Date()
    };

    collection.terms.push(newTerm);

    return newTerm;
  }

  getTermById(termId: string): Term | null {
    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.id === termId) {
          return term;
        }
      }
    }

    return null;
  }

  getTermByContent(content: string): Term | null {
    const lowerContent = content.toLowerCase();

    for (const collection of currentVault.value.collections) {
      for (const term of collection.terms) {
        if (term.content.toLowerCase() === lowerContent) {
          return term;
        }
      }
    }

    return null;
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
    const term = this.getTermById(termId);

    if (term) {
      if (
        term.content.toLowerCase() !== data.content.toLowerCase() &&
        this.termExistsByContent(data.content)
      ) {
        throw new Error('Term already exists');
      }

      term.content = data.content;

      const collectionId = this.getCollectionIdFromTerm(term.id);

      if (collectionId && data.collectionId !== collectionId) {
        const collection = this.getCollectionById(collectionId);
        const destCollection = this.getCollectionById(data.collectionId);

        if (collection && destCollection) {
          // Move to another collection
          const termIndex = collection.terms.findIndex((term) => term.id === termId);
          const termToMove = collection.terms.splice(termIndex, 1)[0];

          destCollection.terms.push(termToMove);
        }
      }
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
    const collection = this.getCollectionById(collectionId);

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
    const sourceCollection = this.getCollectionById(sourceCollectionId);
    const targetCollection = this.getCollectionById(targetCollectionId);

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

  addTermSentence(termId: string, content: string) {
    const term = this.getTermById(termId);

    if (term) {
      term.sentences.push(content);
    }
  }

  updateTermSentence(termId: string, sentenceIndex: number, newContent: string) {
    const term = this.getTermById(termId);

    if (term) {
      term.sentences[sentenceIndex] = newContent;
    }
  }

  removeTermSentence(termId: string, sentenceIndex: number) {
    const term = this.getTermById(termId);

    if (term) {
      term.sentences.splice(sentenceIndex, 1);
    }
  }

  addTermMeaning(termId: string, data: TermMeaning) {
    const term = this.getTermById(termId);

    if (term) {
      term.meanings.push({
        partOfSpeech: data.partOfSpeech,
        content: data.content,
        example: data.example
      });
    }
  }

  updateTermMeaning(termId: string, meaningIndex: number, data: TermMeaning) {
    const term = this.getTermById(termId);

    if (term) {
      term.meanings[meaningIndex].partOfSpeech = data.partOfSpeech;
      term.meanings[meaningIndex].content = data.content;
      term.meanings[meaningIndex].example = data.example;
    }
  }

  removeTermMeaning(termId: string, meaningIndex: number) {
    const term = this.getTermById(termId);

    if (term) {
      term.meanings.splice(meaningIndex, 1);
    }
  }

  addTermReference(termId: string, data: TermReference) {
    const term = this.getTermById(termId);

    if (term) {
      term.references.push({
        url: data.url,
        name: data.name
      });
    }
  }

  updateTermReference(termId: string, referenceIndex: number, data: TermReference) {
    const term = this.getTermById(termId);

    if (term) {
      term.references[referenceIndex].url = data.url;
      term.references[referenceIndex].name = data.name;
    }
  }

  removeTermReference(termId: string, referenceIndex: number) {
    const term = this.getTermById(termId);

    if (term) {
      term.references.splice(referenceIndex, 1);
    }
  }

  setTermMetadata(termId: string, data: TermMetadata) {
    const term = this.getTermById(termId);

    if (term) {
      term.metadata = data;
    }
  }

  setTermLearnedState(termId: string, newState: boolean) {
    const term = this.getTermById(termId);

    if (term) {
      term.learnedAt = newState ? new Date() : null;
    }
  }
}

export const vaultService = new VaultService();
