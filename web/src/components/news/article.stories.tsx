import type { Story } from '@ladle/react'
import ArticleListFC, { Article as ArticleFC } from './article'

const ARTICLE_IMAGE_PLACEHOLDER = 'https://placehold.co/240x180.png'

type ArticleStoryProps = Parameters<typeof ArticleFC>[0] & {
  image: string
}

export const Article: Story<ArticleStoryProps> = ({ image, ...props }) => {
  return (
    <ArticleFC {...props}>
      <img className='mt-4 w-full' src={image} alt='' />
    </ArticleFC>
  )
}

Article.args = {
  title: 'Ini adalah sebuah judul berita.',
  section: 'Berita Utama',
  href: '#',
  image: ARTICLE_IMAGE_PLACEHOLDER
}

type ArticleListStoryProps = {
  articles: Array<ArticleStoryProps>
}

export const ArticleList: Story<ArticleListStoryProps> = ({ articles }) => {
  return (
    <ArticleListFC>
      {articles.map(({ image, ...props }, i) => (
        <ArticleFC {...props} key={i}>
          <img className='w-full' src={image} alt='' />
        </ArticleFC>
      ))}
    </ArticleListFC>
  )
}

ArticleList.args = {
  articles: [
    {
      title: 'Sebuah Contoh Berita, Diharapkan Bisa Mengisi Sesuai Tempat',
      href: '#',
      image: ARTICLE_IMAGE_PLACEHOLDER,
      date: new Date('2025-08-15T08:00:00+07:00')
    },
    {
      title: 'Contoh Berita Lainnya, Semoga Desain Sudah Sesuai',
      href: '#',
      image: ARTICLE_IMAGE_PLACEHOLDER,
      date: new Date('2025-08-14T08:00:00+07:00')
    },
    {
      title:
        'Hanya Sebagai Contoh, Desainer Membuat Judul Berita Ini Agak Panjang',
      href: '#',
      image: ARTICLE_IMAGE_PLACEHOLDER,
      date: new Date('2025-08-13T08:00:00+07:00')
    }
  ]
}
