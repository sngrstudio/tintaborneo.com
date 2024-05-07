import type { APIRoute } from 'astro'
import satori from 'satori'
import template from '~/components/og/template'
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fetchSiteData, fetchLogo } from '~/data/site'

const {
  data: { generalSettings: site },
} = await fetchSiteData()

const {
  data: { mediaItem: logo },
} = await fetchLogo('logo')

export const GET: APIRoute = async ({ url, site: origin }) => {
  const title = url.searchParams.get('title')
  const square = url.searchParams.get('square')

  const svg = await satori(
    template({
      title: title || undefined,
      url: origin!,
      site: site!,
      logo: logo!,
      withFooter: !!title,
    }),
    {
      width: 1200,
      height: !!square ? 1200 : 630,
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
    }
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
