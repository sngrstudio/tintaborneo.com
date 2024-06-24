import type { RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

type SiteInfoResult = FetchQueryResult<
  Required<Pick<RootQuery, 'generalSettings'>>
>
type LogoResult = FetchQueryResult<Required<Pick<RootQuery, 'mediaItem'>>>

export const getSiteInfo = async () => {
  return (await fetchQuery({
    queryId: 'get-site-info'
  })) as SiteInfoResult
}

export const getLogo = async (id: string) => {
  return (await fetchQuery({
    queryId: 'get-logo',
    variables: {
      id
    }
  })) as LogoResult
}
