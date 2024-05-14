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
    `
  })) as SiteDataFetched
}

type LogoFetched = {
  data: Pick<RootQuery, 'mediaItem'>
}

export const fetchLogo = async (id: string) => {
  return (await fetchData({
    query: gql`
      query FetchLogo($id: ID!) {
        mediaItem(id: $id, idType: SLUG) {
          sourceUrl
          slug
          altText
        }
      }
    `,
    variables: {
      id
    }
  })) as LogoFetched
}
