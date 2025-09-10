// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tintaborneo.com',
  adapter: node({
    mode: 'middleware'
  }),

  integrations: [react()],

  image: {
    responsiveStyles: true,
    remotePatterns: [
      {
        protocol: 'https'
      }
    ]
  },

  experimental: {
    liveContentCollections: true,
    staticImportMetaEnv: true,
    chromeDevtoolsWorkspace: true
  },

  vite: {
    // @ts-ignore
    plugins: [tailwindcss(), icons({ compiler: 'jsx', jsx: 'react' })]
  }
})
