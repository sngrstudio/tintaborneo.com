import type { MediaItem } from '~/data/graphql'

const template = ({
  title,
  url,
  date,
  image,
  logo,
  logoAlt,
  isPost,
  mode = 'og'
}: {
  title?: string
  url: URL
  image?: string
  date?: string
  logo: MediaItem
  logoAlt: MediaItem
  isPost?: boolean
  mode?: 'whatsapp' | 'square' | 'og'
}) => {
  return (
    <div
      tw='flex flex-col-reverse bg-[#FCFAFA] text-[#262224] w-full h-full'
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
      <div tw='flex flex-1 flex-col items-center justify-between border-b-[4px] border-[#C90028]'>
        {isPost ? (
          <div
            tw={`flex flex-1 flex-col items-start justify-end w-full ${mode === 'whatsapp' ? 'gap-4 p-4' : 'gap-8 p-8'}`}
            style={{
              backgroundImage: 'linear-gradient(to top, #262224, #00000000)'
            }}
          >
            <img
              tw='mb-auto mx-auto'
              src={logoAlt.sourceUrl!}
              width={mode === 'whatsapp' ? 150 : 300}
              height={mode === 'whatsapp' ? 27 : 54}
              style={{ objectFit: 'contain' }}
            />
            <span
              tw={`font-black text-[#FCFAFA] ${mode === 'whatsapp' ? 'text-4xl' : 'text-6xl'}`}
            >
              {title}
            </span>
            <span
              tw={`text-[#FCFAFA] ${mode === 'whatsapp' ? 'text-xl mt-2' : 'text-3xl mt-6'}`}
              style={{ fontFamily: 'Martel Sans' }}
            >
              {date}
            </span>
          </div>
        ) : (
          <div tw='flex flex-1 flex-col items-center w-full'>
            {title && (
              <div tw='flex pt-4'>
                <img
                  src={logo.sourceUrl!}
                  width={mode === 'whatsapp' ? 150 : 300}
                  height={mode === 'whatsapp' ? 27 : 54}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}

            <div tw='flex flex-1 flex-col items-center justify-center gap-4'>
              {title ? (
                <span
                  tw={`font-black text-[#C90028] ${mode === 'whatsapp' ? 'text-7xl' : 'text-9xl'}`}
                >
                  {title}
                </span>
              ) : (
                <img
                  src={logo.sourceUrl!}
                  width={mode === 'whatsapp' ? 400 : 800}
                  height={mode === 'whatsapp' ? 75 : 150}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
        )}
        {!isPost && (
          <div tw='flex justify-center'>
            <span
              tw={`font-bold text-[#70696B] ${mode === 'whatsapp' ? 'text-lg' : 'text-2xl'}`}
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
