import { type FC, type PropsWithChildren, Fragment } from 'react'
import WhatsAppIcon from '~icons/simple-icons/whatsapp'
import FacebookIcon from '~icons/simple-icons/facebook'
import InstagramIcon from '~icons/simple-icons/instagram'

interface FooterProps {
  links: Array<{ label: string; url: string }>
  title: string
}

const Footer: FC<PropsWithChildren<FooterProps>> = ({
  children,
  title,
  links
}) => {
  const social = [
    {
      icon: <WhatsAppIcon />,
      title: 'WhatsApp',
      url: '#'
    },
    {
      icon: <FacebookIcon />,
      title: 'Facebook',
      url: '#'
    },
    {
      icon: <InstagramIcon />,
      title: 'Instagram',
      url: '#'
    }
  ]

  return (
    <footer className='bg-brand-secondary text-brand-background mt-auto -mb-24 pt-4 pb-6 max-xl:px-4'>
      <div className='mx-auto flex max-w-screen-xl justify-center pb-4'>
        {children}
      </div>
      <div className='mx-auto max-w-screen-xl py-4'>
        <ul className='flex justify-center gap-2'>
          {social.map((link, i) => (
            <li
              className='border-brand-background bg-brand-background/20 rounded border p-2'
              key={i}
            >
              <a href={link.url} aria-label={link.title}>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='mx-auto max-w-screen-xl'>
        <ul className='flex flex-row flex-wrap justify-center-safe gap-x-2 text-sm'>
          {links.map((link, i, arr) => (
            <Fragment key={i}>
              <li>
                <a className='text-nowrap hover:underline' href={link.url}>
                  {link.label}
                </a>
              </li>
              {i < arr.length - 1 && <span>|</span>}
            </Fragment>
          ))}
        </ul>
      </div>
      <div className='text-brand-background/60 mx-auto mt-6 max-w-screen-xl text-center text-sm'>
        &copy; {`${new Date().getFullYear()} ${title}`}
      </div>
    </footer>
  )
}

export default Footer
