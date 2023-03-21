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
    aNestedObject: z.object({
      title: z.string(),
    }),
    anOptionalNestedObject: z
      .object({
        aString: z.string(),
        anOptionalString: z.string().optional(),
        anOptionalNestedObject: z
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
