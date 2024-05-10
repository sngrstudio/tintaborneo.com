import type { FC } from 'react'
import type { PostsData } from './type'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getDateString } from '~/utils/date'

const Carousel: FC<PostsData> = ({ posts }) => {
  const [carouselRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div
      className="overflow-hidden rounded-xl md:rounded-none"
      ref={carouselRef}>
      <div className="flex aspect-[4/3] md:aspect-auto md:gap-2">
        {posts.map((entry, i) => (
          <a
            className="relative flex-[0_0_100%] min-w-0 md:flex-auto md:rounded-xl md:overflow-hidden"
            href={entry.uri!}
            rel="preload"
            key={i}>
            {entry.optimizedImage && (
              <picture>
                <source
                  srcSet={entry.optimizedImage.avif.srcSet.attribute}
                  sizes={entry.optimizedImage.avif.attributes.sizes}
                  type="image/avif"
                />
                <source
                  srcSet={entry.optimizedImage.webp.srcSet.attribute}
                  sizes={entry.optimizedImage.webp.attributes.sizes}
                  type="image/webp"
                />
                <img
                  className="object-cover w-full aspect-[4/3]"
                  src={entry.optimizedImage.original.src}
                  srcSet={entry.optimizedImage.original.srcSet.attribute}
                  sizes={entry.optimizedImage.original.attributes.sizes}
                  alt=""
                  {...entry.optimizedImage.original.attributes}
                />
              </picture>
            )}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-tb-text to-[#00000000] text-tb-background px-4 pb-4">
              <h3 className="font-heading font-bold leading-tight text-2xl md:text-xl">
                <span>{entry.title}</span>
              </h3>
              <p className="text-sm">
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
