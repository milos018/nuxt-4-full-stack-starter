import { z } from 'zod'

export const newPersonalAccountSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  currency: z.string().min(3, 'Currency must be at least 3 characters long'),
  balance: z.number(),
  isDefaultPersonalAccount: z.boolean(),
})
