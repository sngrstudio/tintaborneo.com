/*
* Last time built: 2024-07-09
* This was happened:
* [commonjs--resolver] [plugin vite:resolve] Cannot bundle Node.js built-in "node:path" imported from "node_modules/.pnpm/astro@4.11.5_@types+node@20.14.10_typescript@5.5.3/node_modules/astro/dist/container/index.js". Consider disabling ssr.noExternal or remove the built-in dependency.
*/

import type { APIRoute } from 'astro'
import HomeOGTemplate from '~/components/og/home.astro'
import { renderContainer, renderPng } from '~/components/og/helper'
import { initWasm } from '@resvg/resvg-wasm'
// @ts-ignore
import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm'

export const GET: APIRoute = async () => {
  try {
    await initWasm(resvgWasm)
    const template = await renderContainer(HomeOGTemplate)
    const png = await renderPng(template)

    return new Response(png, {
      headers: {
        'content-type': 'image/png'
      }
    })
  } catch (e) {
    return new Response(
      JSON.stringify(
        e instanceof Error ? e.message : 'Kesalahan tidak diketahui'
      ),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    )
  }
}
