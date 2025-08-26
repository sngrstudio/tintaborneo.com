import type { Story } from '@ladle/react'
import HeaderFC, {
  MenuButton,
  SearchButton,
  type HeaderProps as HeaderFCProps
} from './header'

type HeaderStoryProps = {
  logo: string
} & HeaderFCProps

export const Header: Story<HeaderStoryProps> = ({ logo, items }) => (
  <HeaderFC items={items}>
    <MenuButton />
    <a href='#'>
      <img src={logo} alt='' />
    </a>
    <SearchButton className='ml-auto' />
  </HeaderFC>
)

Header.args = {
  logo: 'https://placehold.co/192x36.png',
  items: [
    {
      label: 'Beranda',
      uri: '#'
    },
    {
      label: 'Peristiwa',
      uri: '#'
    },
    {
      label: 'Pemerintahan',
      uri: '#'
    },
    {
      label: 'Politik',
      uri: '#'
    },
    {
      label: 'Hukum & Kriminalitas',
      uri: '#'
    },
    {
      label: 'Olahraga',
      uri: '#'
    },
    {
      label: 'Adat Budaya',
      uri: '#'
    },
    {
      label: 'Opini',
      uri: '#'
    }
  ]
}
