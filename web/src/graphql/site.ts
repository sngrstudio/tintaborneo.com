import type { RootQuery, GeneralSettings } from './types'
import execute, { gql } from './execute'

type SiteResult = Pick<GeneralSettings, 'title' | 'description'>
type SiteQuery = Pick<RootQuery, 'generalSettings'>

const getSiteGQL = gql`
  query GetSite {
    generalSettings {
      title
      description
    }
  }
`

export const getSite = async () => {
  const { data } = await execute<SiteQuery>(
    getSiteGQL,
    {},
    { ttl: 60 * 60 * 24 * 365 }
  )
  return data.generalSettings as SiteResult
}
