import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB, getDB } from './config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

await connectDB()

app.get('/api/v1/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/api/v1/test-db', async (req, res) => {
  try {
    const db = getDB()
    const result = await db.collection('test').insertOne({
      message: 'Database connection test',
      timestamp: new Date()
    })
    res.json({ success: true, insertedId: result.insertedId })
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' })
  }
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

export default app
