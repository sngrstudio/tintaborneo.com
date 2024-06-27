import type { APIRoute } from 'astro'

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' }
  })
