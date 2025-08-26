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
      className={clsx('flex flex-col justify-between', className)}
      {...props}
    >
      <hgroup className='flex flex-1 flex-col gap-y-1'>
        {section && (
          <div className='font-headings text-brand-accent text-sm leading-relaxed font-bold uppercase max-sm:mx-4'>
            {section}
          </div>
        )}
        <h3 className='font-headings mb-2 text-xl font-extrabold max-sm:mx-4 sm:text-2xl'>
          <a href={href}>{title}</a>
        </h3>
        <div className='text-brand-text/60 mt-auto text-sm max-sm:mx-4'>
          <time dateTime={date.toISOString()}>{getRelativeTime(date)}</time>
        </div>
      </hgroup>

      <a className='mt-4' href={href}>
        {children}
      </a>
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
    <div className={clsx('overflow-hidden', className)} {...props}>
      <div className='flex'>{children}</div>
    </div>
  )
}

export default FeaturedList
