import type { GlobalProvider } from '@ladle/react'
import '../src/layouts/global.css'

export const Provider: GlobalProvider = ({ children }) => {
  return <>{children}</>
}
