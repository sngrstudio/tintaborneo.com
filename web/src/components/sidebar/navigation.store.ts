import { atom } from 'nanostores'

export const $openNavigation = atom<boolean>(false)
export const setOpenNavigation = (value: boolean) => {
  $openNavigation.set(value)
}
