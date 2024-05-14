import type { MediaItem } from '~/data/graphql'

const template = ({
  title,
  url,
  excerpt,
  image,
  logo,
  isPost
}: {
  title?: string
  url: URL
  image?: string
  excerpt?: string
  logo: MediaItem
  isPost?: boolean
}) => {
  return (
    <div
      tw='flex flex-col-reverse bg-[#FCFAFA] w-full h-full'
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
      <div tw='flex flex-1 flex-col items-center justify-between border-b-4 border-[#C90028]'>
        {isPost ? (
          <div
            tw='flex flex-1 flex-col items-start justify-end gap-8 w-full px-8 py-8'
            style={{
              backgroundImage: 'linear-gradient(to top, #FCFAFAEE, #FCFAFA00)'
            }}
          >
            <img
              tw='bg-[#FCFAFA] p-1 mb-auto'
              src={logo.sourceUrl!}
              width={200}
              height={38}
              style={{ objectFit: 'contain' }}
            />
            <span tw='font-black text-6xl text-[#C90028]'>{title}</span>
            {excerpt && <span tw='text-2xl mt-6'>{excerpt}</span>}
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
