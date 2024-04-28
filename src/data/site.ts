import type { RootQuery } from './graphql'
import { fetchData, gql } from './fetcher'

type SiteDataFetched = {
  data: Pick<RootQuery, 'generalSettings'>
}

export const fetchSiteData = async () => {
  return (await fetchData({
    query: gql`
      query FetchSiteData {
        generalSettings {
          title
          description
        }
      }
    `,
  })) as SiteDataFetched
}

type LogoFetched = {
  data: Pick<RootQuery, 'mediaItems'>
}

export const fetchLogo = async () => {
  return (await fetchData({
    query: gql`
      query FetchLogo {
        mediaItems(where: { title: "logo" }) {
          nodes {
            sourceUrl
          }
        }
      }
    `,
  })) as LogoFetched
}
