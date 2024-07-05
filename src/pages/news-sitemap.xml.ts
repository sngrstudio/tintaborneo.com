import type { APIRoute } from 'astro'
import type { Post } from '~/graphql/types'
import { getLatestPosts } from '~/data/posts'
import { getSiteInfo } from '~/data/site'
import { xml } from './sitemap-index.xml'

export const GET: APIRoute = async ({ site, redirect }) => {
  const siteInfo = await getSiteInfo()
  const posts = await getLatestPosts({
    first: 100
  })

  if (posts.nodes.length <= 0) {
    return redirect('/404')
  }

  const xmlResponse = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${posts.nodes
        .filter(
          (p: Post) =>
            new Date().getTime() - new Date(p.date!).getTime() <
            1000 * 60 * 60 * 24 * 2
        )
        .map(
          (post: Post) => `
          <url>
            <loc>${encodeURI(`${site?.origin}${post.uri}`)}</loc>
            <news:news>
              <news:publication>
                <news:name>${siteInfo.title}</news:name>
                <news:language>id</news:language>
              </news:publication>
              <news:publication_date>${post.date}+07:00</news:publication_date>
              <news:title>${post.title}</news:title>
            </news:news>
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
