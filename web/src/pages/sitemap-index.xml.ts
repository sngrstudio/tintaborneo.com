import type { APIRoute } from 'astro'
import { minifyXML } from '~/helpers/xml'

export const GET: APIRoute = async ({ site }) => {
  const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>${new URL('news-sitemap.xml', site).href}</loc>
        </sitemap>
      </sitemapindex>
    `

  return new Response(minifyXML(xml), {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8'
    }
  })
}
