import type { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx/lite'
import MenuIcon from '~icons/material-symbols/menu'
import SearchIcon from '~icons/material-symbols/search'

type HeaderMenuItems = {
  label: string
  uri: string
}

type HeaderNavigationProps = {
  items: Array<
    HeaderMenuItems & {
      childItems?: Array<HeaderMenuItems> | undefined
    }
  >
}

const HeaderNavigation: FC<HeaderNavigationProps> = ({ items }) => {
  return (
    <nav className='-mx-4 w-screen'>
      <ul className='-ml-2 flex flex-nowrap justify-center-safe overflow-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        {items.map((item, i) => (
          <li
            className='font-subheadings text-brand-primary px-2 py-1 font-bold text-nowrap uppercase'
            key={i}
          >
            <a href={item.uri}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

type HeaderButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const HeaderButton: FC<PropsWithChildren<HeaderButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={clsx('p-[6px]', className)} {...props}>
      {children}
    </button>
  )
}

export const MenuButton: FC<HeaderButtonProps> = ({ ...props }) => {
  const handleClick = () => {
    console.log('Menu Button Clicked!')
  }

  return (
    <HeaderButton onClick={handleClick} {...props}>
      <MenuIcon />
    </HeaderButton>
  )
}

export const SearchButton: FC<HeaderButtonProps> = ({ ...props }) => {
  const handleClick = () => {
    console.log('Search Button Clicked!')
  }

  return (
    <HeaderButton onClick={handleClick} {...props}>
      <SearchIcon />
    </HeaderButton>
  )
}

export type HeaderProps = {} & HeaderNavigationProps

const Header: FC<PropsWithChildren<HeaderProps>> = ({ items, children }) => {
  return (
    <header className='bg-brand-background fixed inset-x-0 top-0 z-[999] min-h-[96px] w-screen border-b border-black/25 px-4 py-2'>
      <div className='flex items-center gap-2 pb-2'>{children}</div>
      <HeaderNavigation items={items} />
    </header>
  )
}

export default Header
