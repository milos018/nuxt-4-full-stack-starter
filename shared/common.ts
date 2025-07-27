import { z } from 'zod'

// Common schemas used across the application

export const idSchema = z.string().uuid()

export const selectOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.any().optional(),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
})

export const searchSchema = z.object({
  query: z.string().optional(),
  filters: z.record(z.string(), z.any()).optional(),
})

export type SelectOption = z.infer<typeof selectOptionSchema>
export type Pagination = z.infer<typeof paginationSchema>
export type Search = z.infer<typeof searchSchema>
