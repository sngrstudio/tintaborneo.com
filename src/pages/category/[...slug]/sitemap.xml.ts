import type { APIRoute } from 'astro'
import { getLatestPosts } from '~/data/posts'
import { getCategory } from '~/data/taxonomies'
import { xml } from '~/pages/sitemap-index.xml'

export const GET: APIRoute = async ({ site, params, redirect }) => {
  const { slug } = params
  const category = await getCategory(slug?.split('/').at(-1)!)
  const posts = await getLatestPosts({
    categoryName: category!.slug!,
    first: 100
  })

  if (!category || posts.nodes.length <= 0) {
    return redirect('/404')
  }

  const xmlResponse = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>${encodeURI(`${site?.origin}${post.uri}`)}</loc>
      <lastmod>${post?.date}+07:00</lastmod>
    </url>
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
