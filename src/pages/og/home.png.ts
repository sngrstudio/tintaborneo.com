import type { APIRoute } from 'astro'
import type { ReactNode } from 'react'
import satori from 'satori'
import { html } from 'satori-html'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
// @ts-ignore
import resvgWasm from '~/lib/resvg.wasm'

export const GET: APIRoute = async () => {
  // initialize resvg wasm
  try {
    const SourceSerifProFontData = await fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/source-serif-pro@latest/latin-400-normal.ttf'
    ).then((res) => res.arrayBuffer())

    const markup = html`
      <div style="display: flex; width: 100%; height: 100%;">
        <span style="font-family: 'Source Serif Pro'; font-weight: 400;">
          Hello World!
        </span>
      </div>
    ` as ReactNode

    const svg = await satori(markup, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Source Serif Pro',
          data: SourceSerifProFontData,
          style: 'normal'
        }
      ]
    })

    await initWasm(resvgWasm)
    const png = new Resvg(svg).render().asPng()

    return new Response(png, {
      headers: {
        'Content-Type': 'image/png'
      }
    })
  } catch (e) {
    return new Response(e instanceof Error ? e.message : 'Unknown Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }
}
