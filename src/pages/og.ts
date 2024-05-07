import type { APIRoute } from 'astro'
import satori from 'satori'
import template from '~/components/og/template'
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fetchLogo } from '~/data/site'
import { fetchPost } from '~/data/posts'

const {
  data: { mediaItem: logo },
} = await fetchLogo('logo')

export const GET: APIRoute = async ({ url, site: origin }) => {
  const title = url.searchParams.get('title')
  const postSlug = url.searchParams.get('post')
  const square = url.searchParams.get('square')
  const postData = postSlug ? await fetchPost(postSlug) : undefined

  const svg = await satori(
    template({
      title: postData ? postData.data.post?.title! : title ? title : undefined,
      url: origin!,
      image: postData
        ? postData.data.post?.featuredImage?.node.sourceUrl!
        : undefined,
      excerpt: postData
        ? postData.data.post?.excerpt!.replace(/<[^>]*>|[&][a-zA-Z]+;/g, '')
        : undefined,
      logo: logo!,
      isPost: !!postData,
    }),
    {
      width: !!square ? 960 : 1200,
      height: !!square ? 960 : 630,
      fonts: [
        {
          name: 'Source Serif Pro',
          weight: 400,
          data: await fs.readFile(
            path.join(
              process.cwd(),
              'node_modules/@fontsource/source-serif-pro/files/source-serif-pro-latin-400-normal.woff'
            )
          ),
        },
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
