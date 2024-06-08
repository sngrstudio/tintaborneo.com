import type { RootQuery } from './graphql'
import { fetchQuery, gql, type FetchQueryResult } from './experimental_fetch'

export const fetchPage = async (id: string) => {
  return (await fetchQuery({
    query: gql`
      query FetchPage($id: ID!) {
        page(id: $id, idType: URI) {
          title
          uri
          content
          featuredImage {
            node {
              sourceUrl
              caption
              altText
            }
          }
        }
      }
    `,
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'page'>>>
}
