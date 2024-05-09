import type { APIRoute } from 'astro'

const XSL_SOURCE =
  'https://raw.githubusercontent.com/rodneylab/astro-blog-markdown/b6acd4c811131aa51279df65fdece10937cc5741/public/sitemap.xsl'

export const GET: APIRoute = async () => {
  const xsl = await fetch(XSL_SOURCE).then((res) => res.text())
  return new Response(xsl, {
    headers: {
      'Content-Type': 'text/xsl',
      'Cache-Control': 'public, max-age=31536000, must-revalidate',
      'X-Robots-Tag': 'noindex, follow',
    },
  })
}

export const prerender = true
