import type { APIRoute } from 'astro'

const SITE = import.meta.env.SITE
const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', SITE).href}
Sitemap: ${new URL('news-sitemap.xml', SITE).href}
`.trim()

export const GET: APIRoute = async () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}

export const prerender = true
