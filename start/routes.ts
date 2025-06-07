/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import app from '@adonisjs/core/services/app'
import { readFile } from 'node:fs/promises'

router
  .group(() => {
    router.get('/status', async () => {
      return {
        status: 'success',
        message: 'AdonisJS API is running',
      }
    })
  })
  .prefix('/api')

router.get('/assets/*', async ({ request, response }) => {
  const assetPath = request.param('*').join('/')
  const filePath = app.makePath(`frontend/dist/assets/${assetPath}`)
  return response.download(filePath)
})

router.get('*', async ({ response }) => {
  const indexPath = app.makePath('frontend/dist/index.html')
  try {
    const html = await readFile(indexPath, 'utf-8')
    response.type('text/html')
    return html
  } catch (error) {
    return response.status(404).send('Frontend not built')
  }
})
