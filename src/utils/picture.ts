import type { ImageTransform } from 'astro'
import { getImage } from 'astro:assets'

type GetPictureInput = ImageTransform & { caption?: string }

export const getPicture = async ({ caption, ...src }: GetPictureInput) => {
  const avif = await getImage({ ...src, format: 'avif' })
  const webp = await getImage({ ...src, format: 'webp' })
  const original = await getImage({ ...src, format: 'png' })

  return {
    sources: [avif, webp, original],
    caption: caption ? caption.replace(/<[^>]*>|[&][a-zA-Z]+;/g, '') : undefined
  }
}

export type GetPictureResult = Awaited<ReturnType<typeof getPicture>>
