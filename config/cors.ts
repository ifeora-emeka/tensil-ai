import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true)

    // Allow localhost for development
    if (origin.includes('localhost')) return callback(null, true)

    // Allow Render domains
    if (origin.includes('onrender.com')) return callback(null, true)

    // Allow your custom domain if you have one
    // if (origin === 'https://yourdomain.com') return callback(null, true)

    return callback(null, true) // Allow all origins for now
  },
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
