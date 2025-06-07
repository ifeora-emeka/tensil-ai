import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/database.js'
import authRoutes from './modules/auth/auth.routes.js'
import usersRoutes from './modules/users/users.routes.js'
import { API_PREFIX } from './config/constant.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

await connectDB()

app.use(`${API_PREFIX}/auth`, authRoutes)
app.use(`${API_PREFIX}/users`, usersRoutes)

app.get(`${API_PREFIX}/`, (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

export default app
