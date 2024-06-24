import type { RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

type SiteInfoResult = FetchQueryResult<
  Required<Pick<RootQuery, 'generalSettings'>>
>
type LogoResult = FetchQueryResult<Required<Pick<RootQuery, 'mediaItem'>>>

export const getSiteInfo = async () => {
  const res = (await fetchQuery({
    queryId: 'get-site-info'
  })) as SiteInfoResult
  return res.data.generalSettings!
}

export const getLogo = async (id: string) => {
  const res = (await fetchQuery({
    queryId: 'get-logo',
    variables: {
      id
    }
  })) as LogoResult
  return res.data.mediaItem!
}
