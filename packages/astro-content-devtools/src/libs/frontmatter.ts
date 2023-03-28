export function getFrontmatterProperties(frontmatter: unknown): FrontmatterProperty[] {
  if (!frontmatter || typeof frontmatter !== 'object') {
    return []
  }

  return Object.entries(frontmatter).map(([key, value]) => ({
    key,
    value,
  }))
}

export interface FrontmatterProperty {
  key: string
  value: unknown
}
