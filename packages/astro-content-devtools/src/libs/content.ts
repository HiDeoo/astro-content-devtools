import type { AnyZodObject, ZodDiscriminatedUnion, ZodEffects, ZodIntersection, ZodUnion } from 'astro/zod'
import { getCollection, getEntryBySlug } from 'astro:content'
import zodToJsonSchema from 'zod-to-json-schema'

import { type JsonSchema } from './schema'

export function parseAstroCollections(astroCollections: AstroCollections): Collections {
  const collections: Collections = {}

  for (const [collectionName, collectionConfig] of Object.entries(astroCollections)) {
    const config: CollectionConfig = {}

    if (collectionConfig.schema) {
      config.schema = zodToJsonSchema(collectionConfig.schema, { $refStrategy: 'none', errorMessages: false })
    }

    collections[collectionName] = config
  }

  return collections
}

export function fetchCollectionEntries(collectionName: CollectionName) {
  return getCollection(collectionName)
}

export function fetchCollectionEntry(params: { collectionName: CollectionName; entrySlug: CollectionEntry['slug'] }) {
  return getEntryBySlug(params.collectionName, params.entrySlug)
}

export type CollectionName = string
export type Collections = Record<CollectionName, CollectionConfig>

export interface CollectionConfig {
  schema?: JsonSchema
}

export interface CollectionEntry {
  body: string
  data: unknown
  id: string
  slug: string
}

export type AstroCollections = Record<CollectionName, AstroCollectionConfig>

interface AstroCollectionConfig {
  schema?: AstroCollectionSchema
}

type AstroCollectionSchema = AstroCollectionSchemaWithoutEffects | ZodEffects<AstroCollectionSchemaWithoutEffects>

type AstroCollectionSchemaWithoutEffects =
  | AnyZodObject
  | ZodUnion<[AnyZodObject, ...AnyZodObject[]]>
  | ZodDiscriminatedUnion<string, AnyZodObject[]>
  | ZodIntersection<AnyZodObject, AnyZodObject>
