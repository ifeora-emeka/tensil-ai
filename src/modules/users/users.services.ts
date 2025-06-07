import { getDB } from '../../config/database.js'

export class UsersService {
  async getAllUsers(limit: number = 10, offset: number = 0) {
    const db = getDB()
    
    const users = await db.collection('users')
      .find({}, { projection: { _id: 1, email: 1, displayName: 1, createdAt: 1, updatedAt: 1 } })
      .skip(offset)
      .limit(limit)
      .toArray()

    const total = await db.collection('users').countDocuments()

    return { users, total, limit, offset }
  }
}
