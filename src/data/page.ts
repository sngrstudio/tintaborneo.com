import type { Page, RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

type PageResult = FetchQueryResult<Required<Pick<RootQuery, 'pages'>>>

export const getPages = async () => {
  const res = (await fetchQuery({
    queryId: 'get-pages'
  })) as PageResult

  return res.data.pages?.nodes as Array<Page>
}
