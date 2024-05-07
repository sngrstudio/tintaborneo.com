import type { GeneralSettings, MediaItem } from '~/data/graphql'

const template = ({
  title,
  url,
  site,
  logo,
  withFooter,
}: {
  title?: string
  url: URL
  site: GeneralSettings
  logo: MediaItem
  withFooter?: boolean
}) => {
  return (
    <div
      tw="flex flex-col-reverse bg-[#FCFAFA] w-full h-full"
      style={{ fontFamily: 'Source Serif Pro' }}>
      {withFooter && (
        <div tw="flex items-center justify-between text-[#FCFAFA] bg-[#C90028] px-4 pb-1">
          <span tw="text-3xl">{site.title}</span>
          <span tw="text-xl" style={{ fontFamily: 'Martel Sans' }}>
            {site.description}
          </span>
        </div>
      )}
      <div tw="flex flex-1 flex-col items-center justify-between border-b-4 border-[#C90028] pb-1">
        <div tw="flex"></div>
        <div tw="flex flex-col items-center gap-4">
          {title ? (
            <span tw="text-9xl text-[#C90028]">{title}</span>
          ) : (
            <img src={logo.sourceUrl!} width={800} height={150} />
          )}
        </div>
        <div tw="flex justify-center">
          <span
            tw="text-2xl text-[#70696B]"
            style={{ fontFamily: 'Martel Sans' }}>
            {url.hostname}
          </span>
        </div>
      </div>
    </div>
  )
}

export default template
