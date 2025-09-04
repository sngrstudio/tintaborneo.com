import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ site }) => {
  const txt = `\
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
    `

  return new Response(txt, {
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8'
    }
  })
}
