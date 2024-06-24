import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ site }) => {
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${encodeURI(`${site?.origin}/news-sitemap.xml`)}</loc>
      </sitemap>
    </sitemapindex>  
  `
    .replace(',', '')
    .trim()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex, follow'
    }
  })
}
