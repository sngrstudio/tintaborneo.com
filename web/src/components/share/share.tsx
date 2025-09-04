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
    const FACEBOOK_SHARE_ENDPOINT = 'https://www.facebook.com/sharer/sharer.php'
    const url = window.location.href

    const handlerURL = new URL(FACEBOOK_SHARE_ENDPOINT)
    handlerURL.searchParams.append('u', url)

    window.open(handlerURL.href, '_blank')
  }

  return (
    <div className={clsx('flex items-center gap-1', className)} {...props}>
      <div className='text-brand-muted text-xs font-bold'>Bagikan</div>

      <ShareButton onClick={handleNativeShareBtn}>
        <ShareIcon />
      </ShareButton>

      <ShareButton className='!text-[#25D366]' onClick={handleWhatsAppShareBtn}>
        <WhatsAppIcon />
      </ShareButton>

      <ShareButton className='!text-[#0866FF]' onClick={handleFacebookShareBtn}>
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
        'text-brand-muted aspect-[1/1] p-1 text-lg sm:text-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Share
