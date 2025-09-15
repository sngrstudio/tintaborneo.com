import type { APIRoute } from 'astro'
import { getLiveCollection, getEntry } from 'astro:content'
import { getImage } from 'astro:assets'
import { minifyXML } from '~/helpers/xml'

export const prerender = false

export const GET: APIRoute = async ({ site: siteURL, params, redirect }) => {
  const categorySlug = params.category ? `/${params.category}/` : ''
  const category = await getEntry('categories', categorySlug)

  if (!category) {
    return redirect('/404')
  }

  const news = await getLiveCollection('posts', {
    first: 100,
    categoryName: category.data.slug
  })
  const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
          ${await Promise.all(
            (news.entries ?? []).map(async (entry) => {
              const featuredImage = entry.data.featuredImage
                ? await getImage({
                    src: entry.data.featuredImage,
                    inferSize: true
                  })
                : undefined

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
