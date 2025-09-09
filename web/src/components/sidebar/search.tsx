import { type FC, useRef, useEffect } from 'react'
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
    <dialog
      className='bg-brand-text/50 fixed inset-0 z-[999] min-h-screen min-w-screen backdrop-blur-sm'
      ref={ref}
    >
      <div className='bg-brand-primary text-brand-background ml-auto flex h-screen w-[90vw] flex-col overflow-scroll px-4 py-4'>
        <button className='mb-8 ml-auto' onClick={handleCloseSearch}>
          <CloseIcon />
        </button>
        <div className='border-brand-background ring-brand-background mb-8 flex border ring-offset-2 focus:ring'>
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
        <div id='search-result' className='**:text-brand-background'></div>
      </div>
    </dialog>
  )
}

export default Search
