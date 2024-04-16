import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import alpinejs from '@astrojs/alpinejs'
import htmx from 'astro-htmx'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hanyauntukdisyukuri.my.id',
  integrations: [alpinejs(), htmx()],
  image: {
    domains: [
      'hanyauntukdisyukuri.my.id',
      'www.hanyauntukdisyukuri.my.id',
      'admin.hanyauntukdisyukuri.my.id',
    ],
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})
