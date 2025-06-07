import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const verifyRequestBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors })
      } else {
        res.status(400).json({ error: 'Invalid request body' })
      }
    }
  }
}
