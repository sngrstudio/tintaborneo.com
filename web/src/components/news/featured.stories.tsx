import type { Story } from '@ladle/react'
import FeaturedListFC, {
  FeaturedArticle as FeaturedArticleFC
} from './featured'

const FEATURED_IMAGE_PLACEHOLDER = 'https://placehold.co/480x300.png'

type FeaturedArticleStoryProps = Parameters<typeof FeaturedArticleFC>[0] & {
  image: string
}

export const FeaturedArticle: Story<FeaturedArticleStoryProps> = ({
  image,
  ...props
}) => {
  return (
    <FeaturedArticleFC {...props}>
      <img className='mt-4 w-full' src={image} alt='' />
    </FeaturedArticleFC>
  )
}

FeaturedArticle.args = {
  title: 'Ini adalah sebuah judul berita.',
  section: 'Berita Utama',
  href: '#',
  image: FEATURED_IMAGE_PLACEHOLDER
}

type FeaturedListStoryProps = {
  articles: Array<FeaturedArticleStoryProps>
}

export const FeaturedList: Story<FeaturedListStoryProps> = ({ articles }) => {
  return (
    <FeaturedListFC>
      {articles.map(({ image, ...props }, i) => (
        <FeaturedArticleFC
          {...props}
          className='min-w-0 flex-[0_0_100%]'
          key={i}
        >
          <img className='mt-4 w-full' src={image} alt='' />
        </FeaturedArticleFC>
      ))}
    </FeaturedListFC>
  )
}

FeaturedList.args = {
  articles: [
    {
      title: 'Sebuah Contoh Berita, Diharapkan Bisa Mengisi Sesuai Tempat',
      href: '#',
      image: FEATURED_IMAGE_PLACEHOLDER,
      date: new Date('2025-08-15T08:00:00+07:00')
    },
    {
      title: 'Contoh Berita Lainnya, Semoga Desain Sudah Sesuai',
      href: '#',
      image: FEATURED_IMAGE_PLACEHOLDER,
      date: new Date('2025-08-14T08:00:00+07:00')
    },
    {
      title:
        'Hanya Sebagai Contoh, Desainer Membuat Judul Berita Ini Agak Panjang',
      href: '#',
      image: FEATURED_IMAGE_PLACEHOLDER,
      date: new Date('2025-08-13T08:00:00+07:00')
    }
  ]
}
