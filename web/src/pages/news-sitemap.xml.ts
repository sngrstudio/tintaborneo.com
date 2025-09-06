import type { APIRoute } from 'astro'
import { getLiveCollection, getEntry } from 'astro:content'
import { minifyXML } from '~/helpers/xml'

export const prerender = true

export const GET: APIRoute = async ({ site: siteURL }) => {
  const site = await getEntry('site', 'SITE')
  const collection = await getLiveCollection('posts', { first: 100 })
  const latest = (collection.entries || []).filter(
    (entry) =>
      new Date(entry.data.date! + '+07:00') >=
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  )
  const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
          ${latest
            .map(
              (article) => `
            <url>
              <loc>${new URL(article.id, siteURL)}</loc>
              <news:news>
                <news:publication>
                  <news:name>${site?.data.title}</news:name>
                  <news:language>id-ID</news:language>
                </news:publication>
                <news:publication_date>${new Date(article.data.date! + '+07:00').toISOString()}</news:publication_date>
                <news:title>${article.data.title}</news:title>
              </news:news>
            </url>
            `
            )
            .join('')}
        </urlset>
    `

  return new Response(minifyXML(xml), {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8'
    }
  })
}
