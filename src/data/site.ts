import type { MenuItem, MenuLocationEnum, RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type SiteInfoResult = FetchQueryResult<Pick<RootQuery, 'generalSettings'>>
type LogoResult = FetchQueryResult<Pick<RootQuery, 'mediaItem'>>
type MenuItemsResult = FetchQueryResult<Pick<RootQuery, 'menuItems'>>
type PageResult = FetchQueryResult<Pick<RootQuery, 'page'>>

export const getSiteInfo = async () =>
  ((await fetchQuery('get-site-info', { ttl: 31536000 })) as SiteInfoResult)
    .data.generalSettings!

export const getLogo = async (id: string) =>
  (
    (await fetchQuery('get-logo', {
      variables: { id },
      ttl: 31536000
    })) as LogoResult
  ).data.mediaItem!

export const getMenu = async (location: MenuLocationEnum) =>
  (
    (await fetchQuery('get-menu', {
      variables: { location },
      ttl: 31536000
    })) as MenuItemsResult
  ).data.menuItems?.nodes as Array<MenuItem>

export const getPage = async (id: string) =>
  (
    (await fetchQuery('get-page', {
      variables: { id },
      ttl: 31536000
    })) as PageResult
  ).data.page!
