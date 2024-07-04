import type { APIRoute } from 'astro'
import type { Post } from '~/graphql/types'
import rss from '@astrojs/rss'
import { getSiteInfo } from '~/data/site'
import { getLatestPosts } from '~/data/posts'

export const GET: APIRoute = async ({ site }) => {
  const siteData = await getSiteInfo()

  const posts = await getLatestPosts({
    first: 100
  })

  return rss({
    title: siteData.title!,
    description: siteData.description!,
    site: site!,
    items: posts!.nodes.map((post: Post) => ({
      title: post.title!,
      pubDate: new Date(post.date!),
      link: site?.origin + post.uri!,
      content: post.content!,
      author: post.author?.node.name!
    })),
    customData: `<language>id-id</language>`,
    stylesheet: '/rss.xsl'
  })
}
