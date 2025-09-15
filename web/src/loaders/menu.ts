import type { Loader } from 'astro/loaders'
import { getMenus } from '~/graphql/menu'
import { z } from 'astro:content'
import { MenuLocationEnum } from '~/graphql/types'

type MenuResult = NonNullable<Awaited<ReturnType<typeof getMenus>>>[number]

const menuLoader = (): Loader => {
  return {
    name: 'menu-loader',
    load: async (ctx) => {
      const data = await getMenus()
      if (!data) {
        throw new Error('Error fetching categories')
      }

      ctx.store.clear()
      data.map(async ({ slug: id, ...menu }) => {
        const parsedData = await ctx.parseData<MenuResult>({
          id: id ?? '',
          data: { ...menu }
        })
        const digest = ctx.generateDigest(parsedData)
        ctx.store.set({
          id: id ?? '',
          data: { ...parsedData },
          digest
        })
      })
    },
    schema: z.object({
      name: z.string().default(''),
      slug: z.string().default(''),
      locations: z.nativeEnum(MenuLocationEnum).array().optional(),
      menuItems: z
        .object({
          label: z.string().default(''),
          uri: z.string().default(''),
          parentId: z.string().optional(),
          connectedNode: z.record(z.string(), z.any()),
          childItems: z
            .object({
              label: z.string().default(''),
              uri: z.string().default(''),
              connectedNode: z.record(z.string(), z.any())
            })
            .array()
            .default([])
        })
        .array()
        .default([])
    })
  }
}

export default menuLoader
