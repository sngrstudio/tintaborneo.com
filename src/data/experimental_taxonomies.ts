import type { RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './experimental_fetch'

type TagResult = FetchQueryResult<Required<Pick<RootQuery, 'tag'>>>
type CategoryResult = FetchQueryResult<Required<Pick<RootQuery, 'category'>>>

export const getTagId = async (id: string) => {
  return (await fetchQuery({
    queryId: 'get-tag-id',
    variables: {
      id
    }
  })) as TagResult
}

export const getCategoryId = async (id: string) => {
  return (await fetchQuery({
    queryId: 'get-category-id',
    variables: {
      id
    }
  })) as CategoryResult
}
