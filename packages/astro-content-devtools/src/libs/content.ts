import type { AnyZodObject, ZodDiscriminatedUnion, ZodEffects, ZodIntersection, ZodUnion } from 'astro/zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { type JsonSchema7Type } from 'zod-to-json-schema/src/parseDef'

export function parseAstroCollections(astroCollections: AstroCollections): Collections {
  const collections: Collections = {}

  for (const [collectionName, collectionConfig] of Object.entries(astroCollections)) {
    const config: CollectionConfig = {}

    if (collectionConfig.schema) {
      config.schema = zodToJsonSchema(collectionConfig.schema)
    }

    collections[collectionName] = config
  }

  return collections
}

export type CollectionName = string
export type Collections = Record<CollectionName, CollectionConfig>

interface CollectionConfig {
  schema?: JsonSchema7Type
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
