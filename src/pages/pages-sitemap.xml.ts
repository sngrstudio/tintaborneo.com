import type { APIRoute } from 'astro'
import { getCategories } from '~/data/taxonomies'
import { xml } from './sitemap-index.xml'

export const GET: APIRoute = async ({ site }) => {
  const categories = await getCategories()

  const xmlResponse = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${encodeURI(site?.origin!)}</loc>
      </url>
      ${categories
        .filter((c) => c.count)
        .map(
          (category) =>
            xml`
              <url>
                <loc>${encodeURI(`${site?.origin}${category.uri}`)}</loc>
              </url>
        `
        )
        .join('')}
    </urlset>    
  `.trim()

  return new Response(xmlResponse, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
