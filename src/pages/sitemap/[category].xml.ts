import type { APIRoute } from 'astro'
import type { Post } from '~/data/graphql'
import { fetchCategory } from '~/data/taxonomies'
import { fetchPosts } from '~/data/posts'

export const GET: APIRoute = async ({ site, params, redirect }) => {
  const { category: categoryId } = params
  const {
    data: { category },
  } = await fetchCategory(categoryId!)
  if (!category) return redirect('/404')

  const {
    data: { posts },
  } = await fetchPosts({
    category: category.name!,
    amount: 1024,
  })

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="style.xsl"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${posts?.nodes.map(
        (post: Post) => `
          <url>
            <loc>${site?.origin}${post.uri}</loc>
            <lastmod>${post?.date}+07:00</lastmod>
          </url>
        `
      )}
    </urlset>    
  `.trim()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex, follow',
    },
  })
}
