import { z } from 'zod'

// Generic resource schema - customize for your domain
export const resourceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'archived']).optional().default('active'),
  metadata: z.record(z.string(), z.any()).optional(), // For domain-specific data
  tags: z.array(z.string()).optional(),
  userId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Resource = z.infer<typeof resourceSchema>

// Example of extending for specific use cases:
// export const projectSchema = resourceSchema.extend({
//   dueDate: z.date().optional(),
//   priority: z.enum(['low', 'medium', 'high']),
//   assignees: z.array(z.string()),
// })
