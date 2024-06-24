import type { APIRoute } from 'astro'

const XSL_SOURCE =
  'https://raw.githubusercontent.com/genmon/aboutfeeds/cd0788cb9f8cfa4edf7f88226586d314078b152a/tools/pretty-feed-v3.xsl'

export const GET: APIRoute = async () => {
  const xsl = await fetch(XSL_SOURCE).then((res) => res.text())
  return new Response(xsl, {
    headers: {
      'Content-Type': 'text/xsl',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Cdn-Cache-Control': 'public, s-maxage=31536000, must-revalidate',
      'X-Robots-Tag': 'noindex, follow'
    }
  })
}

export const prerender = true
