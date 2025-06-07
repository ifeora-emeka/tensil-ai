import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tensil-ai'
const client = new MongoClient(uri)

let db: any = null

export async function connectDB() {
  try {
    await client.connect()
    db = client.db('tensil-ai')
    console.log('Connected to MongoDB')
    return db
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not connected')
  }
  return db
}

export async function closeDB() {
  await client.close()
}
