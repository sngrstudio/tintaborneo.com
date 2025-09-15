import { type FC, useRef, useEffect } from 'react'
import SidebarDialog from './sidebar'
import SearchIcon from '~icons/material-symbols/search'
import CloseIcon from '~icons/material-symbols/close'
import { useStore } from '@nanostores/react'
import { $openSearch, setOpenSearch } from './search.store'

const Search: FC = () => {
  const ref = useRef<HTMLDialogElement>(null)
  const openSearch = useStore($openSearch)
  const handleCloseSearch = () => {
    setOpenSearch(false)
  }

  useEffect(() => {
    if (openSearch) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [openSearch])

  return (
    <SidebarDialog ref={ref}>
      <div className='bg-brand-primary text-brand-background ml-auto flex h-screen w-[90vw] max-w-[384px] flex-col overflow-scroll px-4 py-4'>
        <button
          className='mb-8 ml-auto cursor-pointer'
          onClick={handleCloseSearch}
        >
          <CloseIcon />
        </button>
        <div className='border-brand-background ring-brand-background mb-2 flex border ring-offset-2 focus:ring'>
          <input
            className='w-full border-0 bg-transparent ring-0'
            type='search'
            name='q'
            data-hx-get='/dynamic/query'
            data-hx-trigger="input changed delay:500ms, keyup[key=='Enter'], load"
            hx-target='#search-result'
          />
          <button className='pr-1' type='submit'>
            <SearchIcon />
          </button>
        </div>
        <a
          className='bg-brand-background/20 border-brand-background mb-8 rounded border p-2 text-center'
          href='/search'
        >
          Halaman Pencarian
        </a>
        <div id='search-result' className='**:text-brand-background'></div>
      </div>
    </SidebarDialog>
  )
}

export default Search
