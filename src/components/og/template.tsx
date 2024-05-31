import type { MediaItem } from '~/data/graphql'

const template = ({
  title,
  url,
  date,
  image,
  logo,
  isPost
}: {
  title?: string
  url: URL
  image?: string
  date?: string
  logo: MediaItem
  isPost?: boolean
}) => {
  return (
    <div
      tw='flex flex-col-reverse bg-[#262224] text-[#FCFAFA] w-full h-full'
      style={{ fontFamily: 'Source Serif Pro' }}
    >
      {image && (
        <img
          tw='absolute w-full h-full'
          src={image}
          width={1200}
          height={630}
          style={{ objectFit: 'cover' }}
        />
      )}
      <div tw='flex flex-1 flex-col items-center justify-between border-b-[8px] border-[#FCFAFA]'>
        {isPost ? (
          <div
            tw='flex flex-1 flex-col items-start justify-end gap-8 w-full px-8 py-8'
            style={{
              backgroundImage: 'linear-gradient(to top, #262224, #00000000)'
            }}
          >
            <img
              tw='mb-auto mx-auto'
              src={logo.sourceUrl!}
              width={300}
              height={54}
              style={{ objectFit: 'contain' }}
            />
            <span tw='font-black text-6xl'>{title}</span>
            <span tw='text-3xl mt-6' style={{ fontFamily: 'Martel Sans' }}>
              {date}
            </span>
          </div>
        ) : (
          <div tw='flex flex-1 flex-col items-center w-full'>
            {title && (
              <div tw='flex pt-4'>
                <img
                  src={logo.sourceUrl!}
                  width={300}
                  height={57}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}

            <div tw='flex flex-1 flex-col items-center justify-center gap-4'>
              {title ? (
                <span tw='font-black text-9xl text-[#C90028]'>{title}</span>
              ) : (
                <img
                  src={logo.sourceUrl!}
                  width={800}
                  height={150}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
        )}
        {!isPost && (
          <div tw='flex justify-center'>
            <span
              tw='font-bold text-2xl text-[#70696B]'
              style={{ fontFamily: 'Martel Sans' }}
            >
              {url.hostname}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default template
