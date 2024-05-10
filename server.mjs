import Fastify from 'fastify'
import fastifyMiddie from '@fastify/middie'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'node:url'
import { handler as ssrHandler } from './dist/server/entry.mjs'

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = Fastify({ logger: true })

// Register fastify-static with options
await app.register(fastifyStatic, {
  root: fileURLToPath(new URL('./dist/client', import.meta.url)),
})

// Register fastify-middie to use middleware
await app.register(fastifyMiddie)

// Middleware to add Cache-Control header for /_astro/ routes
app.use((req, res, next) => {
  if (req.url.startsWith('/_astro/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  }
  next()
})

// Use your SSR handler
app.use(ssrHandler)

// Start the server
app.listen({ port: PORT, host: HOST })
