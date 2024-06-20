import type { RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

type PostsResult = FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>

export const getFeaturedPosts = async ({
  tagIn,
  categoryName
}: {
  tagIn: string[]
  categoryName?: string
}) => {
  return (await fetchQuery({
    queryId: 'get-featured-posts',
    variables: {
      tagIn,
      categoryName
    }
  })) as PostsResult
}

export const getLatestPosts = async ({
  tagNotIn,
  categoryName,
  first,
  after
}: {
  tagNotIn?: string[]
  categoryName?: string
  first?: number
  after?: string
}) => {
  return (await fetchQuery({
    queryId: 'get-latest-posts',
    variables: {
      tagNotIn,
      categoryName,
      first,
      after
    }
  })) as PostsResult
}

export const getCategoryPosts = async ({
  categoryName,
  first,
  after,
  notIn
}: {
  categoryName: string
  first?: number
  after?: string
  notIn?: string[]
}) => {
  return (await fetchQuery({
    queryId: 'get-category-posts',
    variables: {
      categoryName,
      first,
      after,
      notIn
    }
  })) as PostsResult
}
