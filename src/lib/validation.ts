// lib/validation.ts
import { z } from 'zod'

/**
 * Search query validation schema
 * We keep min 2 chars, but production UX should prefer >=3 for fuzzy.
 */
export const SearchQuerySchema = z.object({
  q: z
    .string()
    .min(2, { message: 'Search query must be at least 2 characters' })
    .max(100, { message: 'Search query must be less than 100 characters' })
    .trim(),
})

export type SearchQuery = z.infer<typeof SearchQuerySchema>

/**
 * Search response schema
 */
export const SearchResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        price: z.number(),
        description: z.string(),
        shortDescription: z.string(),
        images: z.array(z.string()),
        stock: z.number(),
        category: z.string(),
        featured: z.boolean().optional(),
      })
    ),
    total: z.number(),
    query: z.string(),
  }),
  timestamp: z.string(),
})

export type SearchResponse = z.infer<typeof SearchResponseSchema>
