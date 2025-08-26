import {
  type FC,
  type PropsWithChildren,
  type HTMLAttributes,
  Fragment
} from 'react'
import clsx from 'clsx/lite'
import { getRelativeTime } from '~/helpers/time'

type ArticleProps = HTMLAttributes<HTMLElement> & {
  title: string
  section?: string | undefined
  href: string
  date: Date
}

export const Article: FC<PropsWithChildren<ArticleProps>> = ({
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
      className={clsx('grid grid-cols-3 gap-x-2', className)}
      title={title}
      {...props}
    >
      <div className='col-span-2 flex flex-col justify-between gap-y-1'>
        {section && <div className='text-sm uppercase'>{section}</div>}
        <h3 className='font-headings line-clamp-3 leading-snug font-bold'>
          <a href={href}>{title}</a>
        </h3>
        <div className='text-brand-text/60 text-xs'>
          <time dateTime={date.toISOString()}>{getRelativeTime(date)}</time>
        </div>
      </div>
      <a href={href}>{children}</a>
    </article>
  )
}

export const ArticlePlaceholder: FC<HTMLAttributes<HTMLElement>> = ({
  ...props
}) => {
  return (
    <ArticleList {...props}>
      {Array.from({ length: 12 }, (_, i) => (
        <Fragment key={i}>
          <div className='grid animate-pulse grid-cols-3 gap-x-2'>
            <div className='col-span-2 flex flex-col gap-y-2 *:bg-black/15'>
              <div className='h-[1rem]'></div>
              <div className='h-[1rem]'></div>
              <div className='h-[1rem] w-[40%]'></div>
            </div>
            <div className='aspect-[240/180] bg-black/15'></div>
          </div>
        </Fragment>
      ))}
    </ArticleList>
  )
}

const ArticleList: FC<PropsWithChildren<HTMLAttributes<HTMLElement>>> = ({
  children,
  className,
  title,
  ...props
}) => {
  return (
    <div className='@container'>
      <div
        className={clsx('grid grid-cols-1 gap-4 @md:grid-cols-3', className)}
        {...props}
      >
        {title && (
          <h2 className='font-headings text-brand-accent text-lg leading-relaxed font-bold uppercase @md:col-span-3'>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  )
}

export default ArticleList
