import bcrypt from 'bcryptjs'
import { getDB } from '../../config/database.js'
import { User } from '../users/users.model.js'
import { UserSecret } from '../users/users.secrets.js'

export class AuthService {
  async register(email: string, displayName: string, password: string) {
    const db = getDB()
    
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user: User = {
      email,
      displayName,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const userResult = await db.collection('users').insertOne(user)
    
    const userSecret: UserSecret = {
      userId: userResult.insertedId.toString(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await db.collection('user_secrets').insertOne(userSecret)

    return { id: userResult.insertedId, email, displayName }
  }
}
