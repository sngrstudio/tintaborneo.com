import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import Icons from 'unplugin-icons/vite'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  site: 'https://preview.tintaborneo.com',
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true
    }
  }),
  image: {
    domains: [
      'tintaborneo.com',
      'www.tintaborneo.com',
      'preview.tintaborneo.com'
    ]
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
