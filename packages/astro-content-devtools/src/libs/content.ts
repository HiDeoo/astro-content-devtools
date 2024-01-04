import type { AnyZodObject, ZodDiscriminatedUnion, ZodEffects, ZodIntersection, ZodUnion } from 'astro/zod'
import { getCollection, getEntryBySlug } from 'astro:content'

import { type JsonSchema } from './schema'

export async function parseAstroCollections(astroCollections: AstroCollections): Promise<Collections> {
  const { zodToJsonSchema } = await import('zod-to-json-schema')

  const collections: Collections = {}

  for (const [collectionName, collectionConfig] of Object.entries(astroCollections)) {
    const config: CollectionConfig = {}

    if (collectionConfig.schema) {
      const schema = collectionConfig.schema
      config.schema = zodToJsonSchema(typeof schema === 'function' ? schema({}) : schema, {
        $refStrategy: 'none',
        errorMessages: false,
      })
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: AstroCollectionSchema | ((context: any) => AstroCollectionSchema)
  type?: 'content' | 'data'
}

type AstroCollectionSchema = AstroCollectionSchemaWithoutEffects | ZodEffects<AstroCollectionSchemaWithoutEffects>

type AstroCollectionSchemaWithoutEffects =
  | AnyZodObject
  | ZodUnion<[AstroCollectionSchemaWithoutEffects, ...AstroCollectionSchemaWithoutEffects[]]>
  | ZodDiscriminatedUnion<string, AnyZodObject[]>
  | ZodIntersection<AstroCollectionSchemaWithoutEffects, AstroCollectionSchemaWithoutEffects>
