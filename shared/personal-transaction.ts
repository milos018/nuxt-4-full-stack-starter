import { z } from 'zod'

export const newPersonalTransactionSchema = z.object({
  transactionId: z.string().optional(),
  type: z.enum(['income', 'expense']),
  account: z.object({
    id: z.string(),
    label: z.string(),
  }),
  paymentMethod: z.object({
    id: z.string(),
    label: z.string(),
  }),
  amount: z.number(),
  date: z.date(),
  entity: z.object({
    id: z.string(),
    label: z.string(),
  }),
  category: z.object({
    id: z.string(),
    label: z.string(),
  }),
  subCategory: z.object({
    id: z.string().optional(),
    label: z.string().optional(),
  }).optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isCleared: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
  receipt: z.string().optional(),
})

export type PersonalTransactionSchema = z.infer<typeof newPersonalTransactionSchema>
