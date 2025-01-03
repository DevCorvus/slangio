import { SUPPORTED_LANGUAGES } from '@/shared/config/languages';
import { EXTENDED_PARTS_OF_SPEECH } from '@/shared/constants';
import { z } from 'zod';

export const termMetadataSchema = z.object({
  quiz: z.object({
    priority: z.number().min(0).max(1),
    stage: z.number().min(1).max(6),
    cooldown: z.coerce.date(),
    record: z.tuple([z.number().min(0), z.number().min(0)])
  })
});

export const termReferenceSchema = z.object({
  url: z.string(),
  name: z.string()
});

export const termMeaningSchema = z.object({
  partOfSpeech: z.enum(EXTENDED_PARTS_OF_SPEECH),
  content: z.string(),
  example: z.string()
});

export const termSchema = z.object({
  id: z.string(),
  content: z.string(),
  sentences: z.array(z.string()),
  meanings: z.array(termMeaningSchema),
  references: z.array(termReferenceSchema),
  metadata: termMetadataSchema,
  learnedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date()
});

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  terms: z.array(termSchema),
  permanent: z.boolean().optional(),
  createdAt: z.coerce.date()
});

export const vaultSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    source: z.enum(SUPPORTED_LANGUAGES),
    target: z.enum(SUPPORTED_LANGUAGES),
    collections: z.array(collectionSchema),
    defaultCollection: z.string(),
    createdAt: z.coerce.date()
  })
  .refine((data) => {
    const permanentCollections = data.collections.reduce((prev, collection) => {
      if (collection?.permanent) {
        return prev + 1;
      }
      return prev;
    }, 0);

    return permanentCollections === 1;
  });

export const exportedTermSchema = termSchema.pick({
  content: true,
  sentences: true,
  meanings: true,
  references: true
});

export const exportedCollectionSchema = collectionSchema
  .pick({
    name: true,
    description: true
  })
  .extend({ terms: z.array(exportedTermSchema) });

export type ExportedTerm = z.infer<typeof exportedTermSchema>;
export type ExportedCollection = z.infer<typeof exportedCollectionSchema>;
