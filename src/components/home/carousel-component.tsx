import type { FC } from 'react'
import type { PostsData } from './type'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getDateString } from '~/utils/date'

const Carousel: FC<PostsData> = ({ posts }) => {
  const [carouselRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 })
  ])

  return (
    <div
      className='aspect-[4/3] md:aspect-auto overflow-hidden rounded-xl md:col-span-3'
      ref={carouselRef}
    >
      <div className='flex h-full md:gap-2'>
        {posts.map((entry, i) => (
          <a
            className='relative flex-[0_0_100%] min-w-0'
            href={entry.uri!}
            rel='preload'
            key={i}
          >
            {entry.optimizedImage && (
              <picture>
                <source
                  srcSet={entry.optimizedImage.avif.srcSet.attribute}
                  sizes={entry.optimizedImage.avif.attributes.sizes}
                  type='image/avif'
                />
                <source
                  srcSet={entry.optimizedImage.webp.srcSet.attribute}
                  sizes={entry.optimizedImage.webp.attributes.sizes}
                  type='image/webp'
                />
                <img
                  className='object-cover w-full aspect-[4/3]'
                  src={entry.optimizedImage.original.src}
                  srcSet={entry.optimizedImage.original.srcSet.attribute}
                  sizes={entry.optimizedImage.original.attributes.sizes}
                  alt=''
                  {...entry.optimizedImage.original.attributes}
                />
              </picture>
            )}
            <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-tb-text to-[#00000000] text-tb-background px-4 pb-4'>
              <span className='font-subheading font-bold uppercase text-sm'>
                Berita Utama
              </span>
              <h3 className='font-heading font-bold leading-tight text-2xl md:text-3xl'>
                <span className='line-clamp-3'>{entry.title}</span>
              </h3>
              <p className='text-sm'>
                <time dateTime={entry.date!}>
                  {getDateString(new Date(entry.date!))}
                </time>
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Carousel
