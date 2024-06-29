import type { RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type SiteInfoResult = FetchQueryResult<Pick<RootQuery, 'generalSettings'>>
type LogoResult = FetchQueryResult<Pick<RootQuery, 'mediaItem'>>

export const getSiteInfo = async () =>
  ((await fetchQuery('get-site-info')) as SiteInfoResult).data.generalSettings!

export const getLogo = async (id: string) =>
  ((await fetchQuery('get-logo', { id })) as LogoResult).data.mediaItem!
