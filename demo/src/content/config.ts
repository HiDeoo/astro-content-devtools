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

enum NumericEnum {
  Apple,
  Banana,
}

enum StringEnum {
  Apple = 'apple',
  Banana = 'banana',
}

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
    anArray: z.string().array(),
    aNonEmptyArray: z.string().array().nonempty(),
    anotherArray: z.string().array().min(5).max(10),
    aNestedArray: z.object({
      tags: z.string().array().length(10),
    }),
    aNestedArrayOfArrays: z.string().array().array(),
    aTuple: z.tuple([
      z.string(),
      z.number(),
      z.object({
        score: z.number(),
      }),
    ]),
    aVariadicTuple: z.tuple([z.string()]).rest(z.number()).nullable(),
    anUndefined: z.undefined(),
    anUnknown: z.unknown(),
    anNullableBoolean: z.boolean().nullable(),
    anNullableObject: z
      .object({
        title: z.string(),
      })
      .nullable(),
    anNullableRecord: z.record(z.number()).nullable(),
    aNullableString: z
      .string()
      .min(3)
      .max(5)
      .regex(/^[a-z]+$/)
      .nullable(),
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
    aZodEnum: z.enum(['a', 'b', 'c']),
    aNumericNativeEnum: z.nativeEnum(NumericEnum),
    aStringNativeEnum: z.nativeEnum(StringEnum),
    aSet: z.set(z.string()).min(5),
  }),
})

export const collections = {
  docs,
  posts,
  debug,
}
