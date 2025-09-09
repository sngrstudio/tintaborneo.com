import { atom } from 'nanostores'

export const $openSearch = atom<boolean>(false)
export const setOpenSearch = (value: boolean) => {
  $openSearch.set(value)
}
