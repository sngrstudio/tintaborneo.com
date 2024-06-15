import type { RootQuery } from './graphql'
import { fetchQuery, gql, type FetchQueryResult } from './experimental_fetch'

type TagResult = FetchQueryResult<Required<Pick<RootQuery, 'tag'>>>
type PostsResult = FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>

export const getTagId = async (id: string) => {
  return (await fetchQuery({
    queryId: 'get-tag-id',
    variables: {
      id
    }
  })) as TagResult
}

export const getFeaturedPosts = async ({ tagIn }: { tagIn?: string[] }) => {
  return (await fetchQuery({
    queryId: 'get-featured-posts',
    variables: {
      tagIn
    }
  })) as PostsResult
}

export const getLatestPosts = async ({ tagNotIn }: { tagNotIn?: string[] }) => {
  return (await fetchQuery({
    queryId: 'get-latest-posts',
    variables: {
      tagNotIn
    }
  })) as PostsResult
}
