import type { APIRoute } from 'astro'
import { getLiveCollection, getEntry } from 'astro:content'
import { getImage } from 'astro:assets'
import { minifyXML } from '~/helpers/xml'

export const prerender = false

export const GET: APIRoute = async ({ site: siteURL }) => {
  const site = await getEntry('site', 'SITE')
  const news = await getLiveCollection('posts', { first: 100 })
  const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
          ${await Promise.all(
            (news.entries ?? []).map(async (entry) => {
              const featuredImage = entry.data.featuredImage
                ? await getImage({
                    src: entry.data.featuredImage,
                    inferSize: true
                  })
                : undefined
              const entryDate = entry.data.date
                ? new Date(entry.data.date + '+07:00')
                : undefined
              const isRecent = entryDate
                ? entryDate >= new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
                : false

              return `
              <url>
                <loc>${new URL(entry.id, siteURL)}</loc>
                ${
                  featuredImage
                    ? `
                  <image:image>  
                    <image:loc>${new URL(featuredImage.src, siteURL)}</image:loc>  
                  </image:image>  
                `
                    : ''
                }
                ${
                  isRecent
                    ? `
                  <news:news>
                    <news:publication>
                      <news:name>${site?.data.title}</news:name>
                      <news:language>id</news:language>
                    </news:publication>
                    <news:title>${entry.data.title}</news:title>
                    <news:publication_date>${entryDate?.toISOString()}</news:publication_date>
                  </news:news>
                `
                    : ''
                }
              </url>
            `
            })
          ).then((res) => res.join(''))}
        </urlset>
    `

  return new Response(minifyXML(xml), {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8'
    }
  })
}
