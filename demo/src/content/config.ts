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

export const collections = {
  docs,
  posts,
}
