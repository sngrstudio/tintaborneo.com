import type { APIRoute } from 'astro'
import type { Post } from '~/graphql/types'
import { getLatestPosts } from '~/data/posts'
import { getCategory } from '~/data/taxonomies'
import { xml } from './sitemap-index.xml'
import { getImage } from 'astro:assets'

export const GET: APIRoute = async ({ site, params, redirect }) => {
  const { category: categorySlug } = params
  const category = await getCategory(categorySlug!)
  const posts = await getLatestPosts({
    categoryName: category!.slug!,
    first: 250
  })

  if (!category || posts.nodes.length <= 0) {
    return redirect('/404')
  }

  const xmlResponse = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${await Promise.all(
        posts.nodes.map(async (post: Post) => {
          const image = post.featuredImage
            ? await getImage({
                src: post.featuredImage?.node.sourceUrl!,
                inferSize: true
              })
            : undefined

          return `
          <url>
            <loc>${encodeURI(`${site?.origin}${post.uri}`)}</loc>
            <lastmod>${post?.date}+07:00</lastmod>
            ${image ? `<image:image><image:loc>${encodeURI(`${site?.origin}${image.src}`)}</image:loc></image:image>` : ''}
          </url>
        `
        })
      )}
    </urlset>    
  `
    .replace(',', '')
    .trim()

  return new Response(xmlResponse, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
