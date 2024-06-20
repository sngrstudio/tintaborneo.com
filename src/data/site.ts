import type { RootQuery } from './graphql'
import { fetchQuery, gql, type FetchQueryResult } from './fetch'

export const fetchSiteData = async () => {
  return (await fetchQuery({
    query: gql`
      query FetchSiteData {
        generalSettings {
          title
          description
        }
      }
    `
  })) as FetchQueryResult<Required<Pick<RootQuery, 'generalSettings'>>>
}

export const fetchLogo = async (id: string) => {
  return (await fetchQuery({
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
  })) as FetchQueryResult<Required<Pick<RootQuery, 'mediaItem'>>>
}
