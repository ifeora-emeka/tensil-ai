import { z } from 'zod'

export const getUsersSchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0)
})
