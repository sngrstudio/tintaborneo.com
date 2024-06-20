import { type RootQuery, MenuLocationEnum } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

type MenuResult = FetchQueryResult<Required<Pick<RootQuery, 'menuItems'>>>

export const getMenu = async (location: MenuLocationEnum) => {
  return (await fetchQuery({
    queryId: 'get-menu',
    variables: {
      location
    }
  })) as MenuResult
}
