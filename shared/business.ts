import { z } from 'zod'

export const newBusinessSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email(),
  website: z.string().min(3, 'Website must be at least 3 characters long'),
  address: z.string().min(3, 'Address must be at least 3 characters long'),
  city: z.string().min(3, 'City must be at least 3 characters long'),
  state: z.string().optional(),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters long'),
  country: z.object({
    id: z.string(),
    label: z.string(),
  }),
  vat: z.string().min(3, 'VAT must be at least 3 characters long').optional(),
  logoUrl: z.string().optional(),
})

export const updateBusinessSchema = newBusinessSchema.partial().extend({
  countryId: z.string(),
})
