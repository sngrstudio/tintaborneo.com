import type { RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

export const getPage = async (id: string) => {
  return (await fetchQuery({
    queryId: 'get-page',
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'page'>>>
}
