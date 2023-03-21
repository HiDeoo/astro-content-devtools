import { z, defineCollection } from 'astro:content'

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.string().array().optional(),
  }),
})

const debug = defineCollection({
  schema: z.object({
    aString: z.string(),
    anOptionalString: z.string().optional(),
    aNumber: z.number(),
    anOptionalNumber: z.number().int().gt(3).gte(5).lt(10).lte(20).multipleOf(5).optional(),
    aBigInt: z.bigint().positive(),
    aBoolean: z.boolean(),
    aDate: z.date(),
    aRecord: z.record(z.number()),
    aNestedRecord: z.record(z.record(z.number())),
    anotherString: z
      .string()
      .min(3)
      .max(5)
      .regex(/^[a-z]+$/)
      .email()
      .startsWith('st')
      .endsWith('nd'),
    aNestedObject: z.object({
      title: z.string(),
    }),
    anEmptyObject: z.object({}),
    aStringLiteral: z.literal('abc').optional(),
    aNumberLiteral: z.literal(123),
    anUndefined: z.undefined(),
    anUnknown: z.unknown(),
    anNullableBoolean: z.boolean().nullable(),
    anNullableObject: z
      .object({
        title: z.string(),
      })
      .nullable(),
    anNullableRecord: z.record(z.number()).nullable(),
    aNull: z.null(),
    anOptionalNestedObject: z
      .object({
        aString: z.string(),
        anOptionalString: z.string().optional(),
        anOptionalObject: z
          .object({
            aString: z.string(),
            anOptionalString: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
})

export const collections = {
  docs,
  posts,
  debug,
}
