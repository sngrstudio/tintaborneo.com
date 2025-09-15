import {
  type PropsWithChildren,
  type DialogHTMLAttributes,
  forwardRef
} from 'react'
import clsx from 'clsx/lite'

const SidebarDialog = forwardRef<
  HTMLDialogElement,
  PropsWithChildren<DialogHTMLAttributes<HTMLDialogElement>>
>(({ children, className, ...props }, ref) => {
  return (
    <dialog
      className={clsx(
        'bg-brand-text/50 fixed inset-0 z-[999] min-h-screen min-w-screen backdrop-blur-sm',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </dialog>
  )
})

export default SidebarDialog
