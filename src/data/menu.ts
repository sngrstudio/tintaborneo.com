import { type RootQuery, MenuLocationEnum, type MenuItem } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

type MenuResult = FetchQueryResult<Required<Pick<RootQuery, 'menuItems'>>>

export const getMenu = async (location: MenuLocationEnum) => {
  const res = (await fetchQuery({
    queryId: 'get-menu',
    variables: {
      location
    },
    mode: 'static'
  })) as MenuResult
  return res.data.menuItems!.nodes as Array<MenuItem>
}
