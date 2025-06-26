import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3, 'Must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string(),
})
