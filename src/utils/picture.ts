import type { ImageTransform } from 'astro'
import { getImage } from 'astro:assets'

export const getPicture = async (image: ImageTransform) => {
  const avif = await getImage({ ...image, format: 'avif' })
  const webp = await getImage({ ...image, format: 'webp' })
  const original = await getImage({ ...image })

  return {
    avif,
    webp,
    original
  }
}

export type GetPictureResult = Awaited<ReturnType<typeof getPicture>>
