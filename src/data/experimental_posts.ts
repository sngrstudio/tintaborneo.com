import type { RootQuery } from './graphql'
import { fetchQuery, type FetchQueryResult } from './experimental_fetch'

type PostsResult = FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>

export const getFeaturedPosts = async ({ tagIn }: { tagIn: string[] }) => {
  return (await fetchQuery({
    queryId: 'get-featured-posts',
    variables: {
      tagIn
    }
  })) as PostsResult
}

export const getLatestPosts = async ({
  tagNotIn,
  first,
  after
}: {
  tagNotIn?: string[]
  first?: number
  after?: string
}) => {
  return (await fetchQuery({
    queryId: 'get-latest-posts',
    variables: {
      tagNotIn,
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
