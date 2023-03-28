export const PREVIEW_TYPES = ['schema', 'data'] as const

export type PreviewType = (typeof PREVIEW_TYPES)[number]
