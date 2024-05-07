import type { APIRoute } from 'astro'
import satori from 'satori'
import { html } from 'satori-html'
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fetchSiteData } from '~/data/site'

const {
  data: { generalSettings: site },
} = await fetchSiteData()

export const GET: APIRoute = async ({ url, site: origin }) => {
  const markup = html`
    <div
      tw="flex flex-col-reverse bg-[#FCFAFA] w-full h-full"
      style="font-family: 'Source Serif Pro';">
      <div
        tw="flex flex-1 flex-col items-center justify-between border-b-8 border-[#C90028] pb-2">
        <div tw="flex"></div>
        <div tw="flex flex-col items-center gap-4">
          <span tw="font-black text-8xl text-[#C90028]">${site?.title}</span>
          <span tw="text-4xl text-[#70696B]">${site?.description}</span>
        </div>
        <div tw="flex justify-center">
          <span
            tw="text-2xl text-[#70696B]"
            style="font-family: 'Martel Sans';">
            ${origin?.hostname}
          </span>
        </div>
      </div>
    </div>
  ` as any

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Source Serif Pro',
        weight: 700,
        data: await fs.readFile(
          path.join(
            process.cwd(),
            'node_modules/@fontsource/source-serif-pro/files/source-serif-pro-latin-700-normal.woff'
          )
        ),
      },
      {
        name: 'Source Serif Pro',
        weight: 900,
        data: await fs.readFile(
          path.join(
            process.cwd(),
            'node_modules/@fontsource/source-serif-pro/files/source-serif-pro-latin-900-normal.woff'
          )
        ),
      },
      {
        name: 'Martel Sans',
        weight: 700,
        data: await fs.readFile(
          path.join(
            process.cwd(),
            'node_modules/@fontsource/martel-sans/files/martel-sans-latin-700-normal.woff'
          )
        ),
      },
    ],
  })

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
