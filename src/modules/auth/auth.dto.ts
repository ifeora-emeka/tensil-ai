import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email().transform(val => val.toLowerCase().trim()),
  displayName: z.string().min(1).trim(),
  password: z.string().min(6).transform(val => val.trim())
})
