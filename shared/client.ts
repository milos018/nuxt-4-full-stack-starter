import { z } from 'zod'

const baseClientSchema = {
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email(),
  website: z.string().min(3, 'Website must be at least 3 characters long'),
  address: z.string().min(3, 'Address must be at least 3 characters long'),
  city: z.string().min(3, 'City must be at least 3 characters long'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters long'),
  state: z.string().optional(),
  vat: z.string().min(3, 'VAT must be at least 3 characters long').optional(),
}

export const createClientSchema = z.object({
  ...baseClientSchema,
  countryId: z.string(),
})

export const getClientSchema = z.object({
  ...baseClientSchema,
  country: z.object({
    id: z.string(),
    label: z.string(),
  }),
})
