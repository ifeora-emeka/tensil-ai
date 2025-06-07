import { Request, Response } from 'express'
import { AuthService } from './auth.services.js'

export class AuthController {
  private authService = new AuthService()

  async register(req: Request, res: Response) {
    try {
      const { email, displayName, password } = req.body
      const result = await this.authService.register(email, displayName, password)
      res.status(201).json(result)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }
}
