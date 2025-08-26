import type { APIRoute } from 'astro'

const CONTENT_ENDPOINT = import.meta.env.CONTENT_ENDPOINT

export const GET: APIRoute = async (ctx) => {
  return await fetch(`${new URL(CONTENT_ENDPOINT).origin}/${ctx.url.pathname}`)
}

export const prerender = false
