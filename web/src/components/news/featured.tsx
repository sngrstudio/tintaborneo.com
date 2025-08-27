import type { FC, PropsWithChildren, HTMLAttributes } from 'react'
import clsx from 'clsx/lite'
import { getRelativeTime } from '~/helpers/time'

type FeaturedArticleProps = HTMLAttributes<HTMLElement> & {
  title: string
  section?: string | undefined
  href: string
  date: Date
}

export const FeaturedArticle: FC<PropsWithChildren<FeaturedArticleProps>> = ({
  title,
  section,
  href,
  date,
  className,
  children,
  ...props
}) => {
  return (
    <article
      className={clsx(
        '@container relative overflow-hidden rounded-xl',
        className
      )}
      {...props}
    >
      <hgroup className='absolute inset-x-0 bottom-4 z-[1] flex flex-1 flex-col gap-y-1 px-2 @sm:px-4'>
        {section && (
          <div className='font-subheadings text-brand-accent text-sm leading-relaxed font-bold uppercase'>
            {section}
          </div>
        )}
        <h3 className='font-headings text-brand-background mb-2 line-clamp-2 font-extrabold @sm:text-xl sm:@sm:text-2xl'>
          <a href={href}>{title}</a>
        </h3>
        <div className='text-brand-background/60 mt-auto text-sm'>
          <time dateTime={date.toISOString()}>{getRelativeTime(date)}</time>
        </div>
      </hgroup>

      <a href={href}>{children}</a>
      <div className='from-brand-text/75 absolute inset-0 z-[0] bg-gradient-to-t to-transparent'></div>
    </article>
  )
}

export const FeaturedArticlePlaceholder: FC = () => {
  return (
    <div className='flex animate-pulse flex-col justify-between'>
      <div className='flex min-h-[112px] flex-1 flex-col gap-y-2 *:bg-black/15'>
        <div className='mb-4 h-[0.875rem] w-[25%]'></div>
        <div className='h-[1.25rem]'></div>
        <div className='h-[1.25rem]'></div>
        <div className='h-[1.25rem] w-[40%]'></div>
      </div>

      <div className='-mx-4 mt-4 aspect-[480/300] bg-black/15'></div>
    </div>
  )
}

type FeaturedListProps = HTMLAttributes<HTMLElement>

const FeaturedList: FC<PropsWithChildren<FeaturedListProps>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx('overflow-hidden rounded-xl', className)} {...props}>
      <div className='flex'>{children}</div>
    </div>
  )
}

export default FeaturedList
