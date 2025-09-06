import type {
  FC,
  PropsWithChildren,
  ButtonHTMLAttributes,
  HTMLAttributes
} from 'react'
import clsx from 'clsx/lite'
import ShareIcon from '~icons/material-symbols/share'
import WhatsAppIcon from '~icons/simple-icons/whatsapp'
import FacebookIcon from '~icons/simple-icons/facebook'

const Share: FC<HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
  const handleNativeShareBtn = () => {
    const title = document.title
    const url = window.location.href

    navigator.share({
      title,
      url
    })
  }

  const handleWhatsAppShareBtn = () => {
    const WHATSAPP_SHARE_ENDPOINT = 'https://wa.me'
    const title = document.title
    const url = window.location.href

    const handlerURL = new URL(WHATSAPP_SHARE_ENDPOINT)
    handlerURL.searchParams.append('text', `${title} — ${url}`)

    window.open(handlerURL.href, '_blank')
  }

  const handleFacebookShareBtn = () => {
    const FACEBOOK_SHARE_ENDPOINT = 'https://www.facebook.com/dialog/share'
    const url = window.location.href

    const handlerURL = new URL(FACEBOOK_SHARE_ENDPOINT)
    handlerURL.searchParams.append('href', url)
    handlerURL.searchParams.append('display', 'popup')

    window.open(handlerURL.href, '_blank')
  }

  return (
    <div className={clsx('flex items-center gap-2', className)} {...props}>
      <div className='text-brand-muted text-xs font-bold'>Bagikan</div>

      <ShareButton onClick={handleNativeShareBtn}>
        <ShareIcon />
      </ShareButton>

      <ShareButton className='!bg-[#25D366]' onClick={handleWhatsAppShareBtn}>
        <WhatsAppIcon />
      </ShareButton>

      <ShareButton className='!bg-[#0866FF]' onClick={handleFacebookShareBtn}>
        <FacebookIcon />
      </ShareButton>
    </div>
  )
}

const ShareButton: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        'bg-brand-muted text-brand-background rounded px-3 py-2 text-lg sm:text-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Share
