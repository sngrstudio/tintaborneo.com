import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ locals }) => {
  // @ts-ignore
  const { env } = locals.runtime

  return new Response(JSON.stringify({ endpoint: env.ADMIN_ENDPOINT }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
