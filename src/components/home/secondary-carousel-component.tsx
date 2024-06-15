import type { FC } from 'react'
import type { Experimental_PostsData as PostsData } from './type'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getDateString } from '~/utils/date'

const Carousel: FC<{posts: Array<PostsData>}> = ({ posts }) => {
  const [carouselRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 })
  ])

  return (
    <div
      className='flex items-stretch overflow-hidden md:col-span-2'
      ref={carouselRef}
    >
      <div className='flex aspect-[1/1] md:aspect-auto md:gap-2'>
        {posts.map((entry, i) => (
          <div className='flex-[0_0_100%] grid grid-cols-2 gap-2 mr-2' key={i}>
            {entry.map((en, i) => (
              <a
                className='relative rounded-xl overflow-hidden'
                href={en.uri!}
                key={i}
              >
                {en.optimizedImage && (
                  <picture>
                    <source
                      srcSet={en.optimizedImage.avif.srcSet.attribute}
                      sizes={en.optimizedImage.avif.attributes.sizes}
                      type='image/avif'
                    />
                    <source
                      srcSet={en.optimizedImage.webp.srcSet.attribute}
                      sizes={en.optimizedImage.webp.attributes.sizes}
                      type='image/webp'
                    />
                    <img
                      className='object-cover w-full h-full'
                      src={en.optimizedImage.original.src}
                      srcSet={en.optimizedImage.original.srcSet.attribute}
                      sizes={en.optimizedImage.original.attributes.sizes}
                      alt=''
                      {...en.optimizedImage.original.attributes}
                    />
                  </picture>
                )}
                <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-tb-text to-[#00000000] text-tb-background px-4 pb-4'>
                  <h3 className='font-heading font-bold leading-tight text-lg'>
                    <span className='line-clamp-3'>{en.title}</span>
                  </h3>
                  <p className='text-sm'>
                    <time dateTime={en.date!}>
                      {getDateString(new Date(en.date!))}
                    </time>
                  </p>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
