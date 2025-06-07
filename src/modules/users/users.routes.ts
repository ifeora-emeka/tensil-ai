import { Router } from 'express'
import { UsersController } from './users.controller.js'

const router = Router()
const usersController = new UsersController()

router.get('/', usersController.getAllUsers)

export default router
