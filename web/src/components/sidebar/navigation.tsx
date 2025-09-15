import { type FC, type PropsWithChildren, useRef, useEffect } from 'react'
import SidebarDialog from './sidebar'
import CloseIcon from '~icons/material-symbols/close'
import { useStore } from '@nanostores/react'
import { $openNavigation, setOpenNavigation } from './navigation.store'

const SidebarNavigation: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDialogElement>(null)
  const openNavigation = useStore($openNavigation)
  const handleCloseSearch = () => {
    setOpenNavigation(false)
  }

  useEffect(() => {
    if (openNavigation) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [openNavigation])

  return (
    <SidebarDialog ref={ref}>
      <div className='bg-brand-primary text-brand-background mr-auto flex h-screen w-[90vw] max-w-[384px] flex-col overflow-scroll px-4 py-4'>
        <button
          className='mb-8 ml-auto cursor-pointer'
          onClick={handleCloseSearch}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </SidebarDialog>
  )
}

export default SidebarNavigation
