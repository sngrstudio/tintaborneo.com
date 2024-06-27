import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ locals, url }) => {
  // @ts-ignore
  const { env } = locals.runtime

  return new Response(JSON.stringify({ url, env }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
