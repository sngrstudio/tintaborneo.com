import type { Loader } from 'astro/loaders'
import { getSite } from '~/graphql/site'
import { z } from 'astro:content'

type SiteResult = Awaited<ReturnType<typeof getSite>>

const siteLoader = (): Loader => {
  return {
    name: 'site-loader',
    load: async (ctx) => {
      const data = await getSite()
      if (!data) throw new Error('Error: No site data found')

      ctx.store.clear()
      const parsedData = await ctx.parseData<SiteResult>({
        id: 'SITE',
        data: { ...data }
      })
      const digest = ctx.generateDigest(parsedData)
      ctx.store.set({
        id: 'SITE',
        data: { ...parsedData },
        digest
      })
    },
    schema: z.object({
      title: z.string().default(''),
      description: z.string().default('')
    })
  }
}

export default siteLoader
