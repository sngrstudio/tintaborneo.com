import type { FC } from 'react'
import type { PostsData } from './type'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const Carousel: FC<PostsData> = ({ posts }) => {
  const [carouselRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div className="flex aspect-[4/3] md:aspect-auto md:gap-2">
        {posts.map((entry) => (
          <a
            className="relative flex-[0_0_100%] min-w-0 md:flex-auto"
            href={entry.uri!}
            rel="preload">
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
                  className="w-full aspect-[4/3]"
                  src={entry.optimizedImage.original.src}
                  srcSet={entry.optimizedImage.original.srcSet.attribute}
                  sizes={entry.optimizedImage.original.attributes.sizes}
                  alt={entry.featuredImage?.node.altText || entry.title!}
                  loading="eager"
                  {...entry.optimizedImage.original.attributes}
                />
              </picture>
            )}
            <div className="absolute bottom-0 inset-x-0">
              <h3 className=" font-heading font-bold text-2xl px-2 pb-4 md:text-xl">
                <span className="text-tb-background bg-tb-primary p-1">
                  {entry.title}
                </span>
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Carousel
