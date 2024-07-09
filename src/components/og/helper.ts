import type { ReactNode } from 'react'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-wasm'

const SOURCE_SERIF_PRO_REGULAR =
  'https://cdn.jsdelivr.net/fontsource/fonts/source-serif-pro@latest/latin-400-normal.ttf'
const SOURCE_SERIF_PRO_BOLD =
  'https://cdn.jsdelivr.net/fontsource/fonts/source-serif-pro@latest/latin-700-normal.ttf'

export const renderContainer = async (template: any) =>
  (await AstroContainer.create()).renderToString(template)

export const renderPng = async (template: string) => {
  try {
    const svg = await satori(html(template) as ReactNode, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Source Serif Pro Regular',
          style: 'normal',
          data: await (await fetch(SOURCE_SERIF_PRO_REGULAR)).arrayBuffer()
        },
        {
          name: 'Source Serif Pro Bold',
          style: 'normal',
          data: await (await fetch(SOURCE_SERIF_PRO_BOLD)).arrayBuffer()
        }
      ]
    })

    return new Resvg(svg).render().asPng()
  } catch (e) {
    throw new Error(
      `Error on rendering PNG: ${e instanceof Error ? e.message : 'Unknown error'}`
    )
  }
}
