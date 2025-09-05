import type { FC, PropsWithChildren } from 'react'

interface FooterProps {
  links: Array<{ label: string; url: string }>
  title: string
}

const Footer: FC<PropsWithChildren<FooterProps>> = ({
  children,
  title,
  links
}) => {
  return (
    <footer className='bg-brand-muted text-brand-background mt-16 -mb-24 pt-4 pb-6 max-xl:px-4'>
      <div className='mx-auto flex max-w-screen-xl justify-center pb-4'>
        {children}
      </div>
      <div className='mx-auto max-w-screen-xl'>
        <ul className='flex flex-col gap-1 text-sm md:flex-row md:justify-center md:gap-2'>
          {links.map((link, i) => (
            <li key={i}>
              <a className='hover:underline' href={link.url}>
                {link.label}
              </a>
            </li>
          ))}
          <li className='text-brand-background/75 max-md:mt-6'>
            &copy; {`${new Date().getFullYear()} ${title}`}
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
