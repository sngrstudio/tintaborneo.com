import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import Icons from 'unplugin-icons/vite'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tintaborneo.com',
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  image: {
    domains: ['tintaborneo.com', 'www.tintaborneo.com']
  },
  prefetch: true,
  experimental: {
    clientPrerender: true,
    directRenderScript: true
  },
  vite: {
    plugins: [
      Icons({
        compiler: 'astro'
      })
    ]
  }
})
