import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import alpinejs from '@astrojs/alpinejs'
import htmx from 'astro-htmx'
import tailwind from '@astrojs/tailwind'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hanyauntukdisyukuri.my.id',
  integrations: [alpinejs(), htmx(), tailwind()],
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
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
})
