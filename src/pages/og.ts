import type { APIRoute } from 'astro'
import satori from 'satori'
import template from '~/components/og/template'
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fetchLogo } from '~/data/site'
import { fetchPost } from '~/data/posts'
import { getDateString } from '~/utils/date'

const {
  data: { mediaItem: logo }
} = await fetchLogo('logo')
const {
  data: { mediaItem: logoAlt }
} = await fetchLogo('logo-alt')

export const GET: APIRoute = async ({ url, site: origin }) => {
  const title = url.searchParams.get('title')
  const postSlug = url.searchParams.get('post')
  const square = url.searchParams.get('square')
  const whatsapp = url.searchParams.get('whatsapp')
  const postData = postSlug ? await fetchPost(postSlug) : undefined

  const svg = await satori(
    template({
      title: postData ? postData.data.post?.title! : title ? title : undefined,
      url: origin!,
      image: postData
        ? postData.data.post?.featuredImage?.node.sourceUrl!
        : undefined,
      date: postData
        ? getDateString(new Date(postData.data.post?.date! + '+07:00'), {
            format: 'full'
          })
        : undefined,
      logo: logo!,
      logoAlt: logoAlt!,
      isPost: !!postData,
      mode: !!whatsapp ? 'whatsapp' : !!square ? 'square' : 'og'
    }),
    {
      width: !!whatsapp ? 600 : !!square ? 960 : 1200,
      height: !!whatsapp ? 336 : !!square ? 960 : 630,
      fonts: [
        {
          name: 'Source Serif Pro',
          weight: 400,
          data: await fs.readFile(
            path.join(
              process.cwd(),
              'node_modules/@fontsource/source-serif-pro/files/source-serif-pro-latin-400-normal.woff'
            )
          )
        },
        {
          name: 'Source Serif Pro',
          weight: 700,
          data: await fs.readFile(
            path.join(
              process.cwd(),
              'node_modules/@fontsource/source-serif-pro/files/source-serif-pro-latin-700-normal.woff'
            )
          )
        },
        {
          name: 'Source Serif Pro',
          weight: 900,
          data: await fs.readFile(
            path.join(
              process.cwd(),
              'node_modules/@fontsource/source-serif-pro/files/source-serif-pro-latin-900-normal.woff'
            )
          )
        },
        {
          name: 'Martel Sans',
          weight: 700,
          data: await fs.readFile(
            path.join(
              process.cwd(),
              'node_modules/@fontsource/martel-sans/files/martel-sans-latin-700-normal.woff'
            )
          )
        }
      ]
    }
  )

  const png = await sharp(Buffer.from(svg))
    .png({
      quality: 60,
      force: true
    })
    .toBuffer()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'x-robots-tag': 'noindex, follow',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=3600',
      'CDN-Cache-Control':
        'public, s-maxage=86400, stale-while-revalidate=604800'
    }
  })
}
