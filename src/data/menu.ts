import type { RootQuery } from './graphql'
import { fetchData, gql } from './fetcher'

type MenuList = {
  data: Pick<RootQuery, 'menu'>
}

export const fetchMenuList = async (id: string) => {
  return (await fetchData({
    query: gql`
      query FetchMenuList($id: ID!) {
        menu(id: $id, idType: LOCATION) {
          menuItems {
            edges {
              node {
                uri
                label
                order
              }
            }
          }
        }
      }
    `,
    variables: {
      id,
    },
  })) as MenuList
}
