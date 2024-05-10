import type { APIRoute } from 'astro'
import type { Post } from '~/data/graphql'
import { fetchPosts } from '~/data/posts'

export const GET: APIRoute = async ({ site }) => {
  const {
    data: { posts: postsData },
  } = await fetchPosts({
    amount: 64,
  })

  const posts = postsData!.nodes.filter((p: Post) => {
    return (
      new Date().getTime() - new Date(p.date!).getTime() <
      1000 * 60 * 60 * 24 * 2
    )
  })

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="style.xsl"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${posts?.map(
        (post: Post) => `
          <url>
            <loc>${site?.origin}${post.uri}</loc>
            <lastmod>${post?.date}+07:00</lastmod>
          </url>
        `
      )}
    </urlset>    
  `.replace(/\s+/g, '')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex, follow',
    },
  })
}
