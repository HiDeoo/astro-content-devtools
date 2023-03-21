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
    aBoolean: z.boolean(),
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
    anOptionalNestedObject: z
      .object({
        aString: z.string(),
        anOptionalString: z.string().optional(),
        anOptionalObject: z.object({
          aString: z.string(),
          anOptionalString: z.string().optional(),
        }),
      })
      .optional(),
  }),
})

export const collections = {
  docs,
  posts,
  debug,
}
