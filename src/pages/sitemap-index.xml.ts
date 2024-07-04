import type { APIRoute } from 'astro'
import { getCategories } from '~/data/taxonomies'

export const xml = String.raw

export const GET: APIRoute = async ({ site }) => {
  const categories = await getCategories()
  const xmlResponse = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${encodeURI(`${site?.origin}/news-sitemap.xml`)}</loc>
      </sitemap>
      <sitemap>
        <loc>${encodeURI(`${site?.origin}/pages-sitemap.xml`)}</loc>
      </sitemap>
      ${categories
        .filter((c) => c.count)
        .map(
          (category) =>
            xml`<sitemap>
            <loc>${encodeURI(`${site?.origin}${category.uri}sitemap.xml`)}</loc>
          </sitemap>`
        )}
    </sitemapindex>  
  `
    .replace(',', '')
    .trim()

  return new Response(xmlResponse, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
