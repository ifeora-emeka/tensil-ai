import { Request, Response } from 'express'
import { UsersService } from './users.services.js'

export class UsersController {
    private usersService = new UsersService()

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const { limit, offset } = req.query
            const result = await this.usersService.getAllUsers(
                limit ? parseInt(limit as string) : 10,
                offset ? parseInt(offset as string) : 0
            )
            res.json(result)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: (error as Error).message })
        }
    }
}
