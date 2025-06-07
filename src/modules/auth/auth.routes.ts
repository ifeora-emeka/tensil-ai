import { Router } from 'express'
import { AuthController } from './auth.controller.js'
import { verifyRequestBody } from './auth.middleware.js'
import { registerSchema } from './auth.dto.js'

const router = Router()
const authController = new AuthController()

router.post('/register', verifyRequestBody(registerSchema), authController.register)

export default router
