import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { minifyXML } from '~/helpers/xml'

export const GET: APIRoute = async ({ site }) => {
  const categories = await getCollection('categories')

  const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>${new URL('sitemap-0.xml', site)}</loc>
        </sitemap>
        ${categories
          .map(
            (entry) => `
          <sitemap>
            <loc>${new URL(['category', entry.id, 'sitemap-0.xml'].join(''), site)}</loc>
          </sitemap>
          `
          )
          .join('')}
      </sitemapindex>
    `

  return new Response(minifyXML(xml), {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8'
    }
  })
}
