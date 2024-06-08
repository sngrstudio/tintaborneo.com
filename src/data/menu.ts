import type { RootQuery } from './graphql'
import { fetchQuery, gql, type FetchQueryResult } from './experimental_fetch'

export const fetchMenuList = async (id: string) => {
  return (await fetchQuery({
    query: gql`
      query FetchMenuList($id: ID!) {
        menu(id: $id, idType: LOCATION) {
          menuItems(first: 50) {
            nodes {
              label
              uri
              order
              parentId
              connectedNode {
                node {
                  ... on Category {
                    slug
                    posts {
                      nodes {
                        uri
                      }
                    }
                  }
                }
              }
              connectedObject {
                ... on Category {
                  slug
                }
              }
              childItems(first: 50) {
                nodes {
                  label
                  uri
                  order
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'menu'>>>
}
