import type { APIRoute } from 'astro'
import type { Post } from '~/data/graphql'
import rss from '@astrojs/rss'
import { fetchSiteData } from '~/data/site'
import { fetchPosts } from '~/data/posts'

export const GET: APIRoute = async ({ site }) => {
  const {
    data: { generalSettings: siteData },
  } = await fetchSiteData()

  const {
    data: { posts },
  } = await fetchPosts({
    amount: 100,
  })

  return rss({
    title: siteData?.title!,
    description: siteData?.description!,
    site: site!,
    items: posts!.nodes.map((post: Post) => ({
      title: post.title!,
      pubDate: new Date(post.date!),
      link: site?.origin + post.uri!,
      content: post.content!,
      author: post.author?.node.name!,
    })),
    customData: `<language>id-id</language>`,
    stylesheet: '/rss.xsl',
  })
}
