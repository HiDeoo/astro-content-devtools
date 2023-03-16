import type { AnyZodObject, ZodDiscriminatedUnion, ZodEffects, ZodIntersection, ZodUnion } from 'astro/zod'

export interface CollectionConfig {
  schema?: CollectionSchema
}

type CollectionSchema = CollectionSchemaWithoutEffects | ZodEffects<CollectionSchemaWithoutEffects>

type CollectionSchemaWithoutEffects =
  | AnyZodObject
  | ZodUnion<[AnyZodObject, ...AnyZodObject[]]>
  | ZodDiscriminatedUnion<string, AnyZodObject[]>
  | ZodIntersection<AnyZodObject, AnyZodObject>
