import type { RootQuery } from './graphql'
import { fetchQuery, gql, type FetchQueryResult } from './experimental_fetch'

type PostsResult = FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>

export const getTagId = async (id: string) => {
  return (await fetchQuery({
    queryId: 'get-tag-id',
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'tag'>>>
}

export const getLatestPosts = async ({notIn, tagNotIn}: {notIn?: string[], tagNotIn?: string[]}) => {
  return (await fetchQuery({
    queryId: 'get-latest-posts',
    variables: {
      notIn,
      tagNotIn
    }
  })) as PostsResult
}