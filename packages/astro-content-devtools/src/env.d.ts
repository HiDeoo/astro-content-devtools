/// <reference types="astro/client" />

declare module '*.astro'

declare module 'astro:content' {
  export interface AstroCollectionEntry {
    body: string
    data: unknown
    id: string
    render: () => Promise<{
      Content: import('astro').MarkdownInstance<object>['Content']
      headings: import('astro').MarkdownHeading[]
      remarkPluginFrontmatter: Record<string, unknown>
    }>
    slug: string
  }

  export function getCollection(collectionName: string): Promise<AstroCollectionEntry[]>
  export function getEntryBySlug(collectionName: string, entrySlug: string): Promise<AstroCollectionEntry | undefined>
}
