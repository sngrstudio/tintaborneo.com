import type { RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './experimental_fetch'

type MenuResult = FetchQueryResult<Required<Pick<RootQuery, 'menuItems'>>>

export const getMenu = async (id: string) => {
  return (await fetchQuery({
    queryId: 'get-menu',
    variables: {
      location: id
    }
  })) as MenuResult
}
