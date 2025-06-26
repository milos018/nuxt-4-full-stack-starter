import { z } from 'zod'

export const newPersonalPaymentMethodSchema = z.object({
  label: z.string().min(1, 'Label must be at least 1 character long'),
  personalAccount: z.object({
    id: z.string().uuid(),
    label: z.string(),
  }).optional().nullable(),
})
