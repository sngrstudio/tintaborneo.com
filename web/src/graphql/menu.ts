import { type RootQuery, type Menu, type MenuItem } from './types'
import execute, { gql } from './execute'

type MenuResult = Pick<Menu, 'name' | 'slug' | 'locations' | 'menuItems'>
type MenuItemsResult = Pick<
  MenuItem,
  'label' | 'uri' | 'connectedNode' | 'childItems'
>
type MenuQuery = Pick<RootQuery, 'menus'>

const getMenusGQL = gql`
  query GetMenus {
    menus {
      nodes {
        name
        slug
        locations
        menuItems(first: 100) {
          nodes {
            label
            uri
            connectedNode {
              node {
                ... on Category {
                  name
                  slug
                }
              }
            }
            childItems(first: 100) {
              nodes {
                label
                uri
                connectedNode {
                  node {
                    ... on Category {
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const getMenus = async () => {
  const { data } = await execute<MenuQuery>(
    getMenusGQL,
    {},
    { ttl: 60 * 60 * 24 * 365 }
  )
  return data.menus?.nodes.map((menu: MenuResult) => ({
    ...menu,
    menuItems: menu.menuItems?.nodes.map((item: MenuItemsResult) => ({
      label: item.label ?? '',
      uri: item.uri ?? '',
      connectedNode: item.connectedNode ?? {},
      childItems: item.childItems?.nodes.map(
        (child: Omit<MenuItemsResult, 'childItems'>) => ({
          label: child.label ?? '',
          uri: child.uri ?? '',
          connectedNode: child.connectedNode ?? {}
        })
      )
    }))
  }))
}
