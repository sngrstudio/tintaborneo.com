import type { Loader } from 'astro/loaders'
import { getCategories } from '~/graphql/categories'
import { z } from 'astro:content'

type CategoryResult = NonNullable<
  Awaited<ReturnType<typeof getCategories>>
>[number]

const categoriesLoader = (): Loader => {
  return {
    name: 'categories-loader',
    load: async (ctx) => {
      const data = await getCategories()
      if (!data) {
        throw new Error('Error fetching categories')
      }

      ctx.store.clear()
      data.map(async ({ uri, ...category }) => {
        const parsedData = await ctx.parseData<CategoryResult>({
          id: uri?.replace(/^\/category/, '') ?? '',
          data: { uri: uri!, ...category }
        })
        const digest = ctx.generateDigest(parsedData)
        ctx.store.set({
          id: uri?.replace(/^\/category/, '') ?? '',
          data: { ...parsedData },
          digest
        })
      })
    },
    schema: z.object({
      name: z.string().default(''),
      slug: z.string().default(''),
      uri: z.string(),
      children: z.record(z.string(), z.any()).array()
    })
  }
}

export default categoriesLoader
