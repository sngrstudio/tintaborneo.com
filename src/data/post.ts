import type { RootQuery, Post } from './graphql'
import { fetchQuery, type FetchQueryResult } from './fetch'

type PostResult = FetchQueryResult<Required<Pick<RootQuery, 'post'>>>
type PostsResult = FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>

export const getPost = async (id: string) => {
  const res = (await fetchQuery({
    queryId: 'get-post',
    variables: {
      id
    }
  })) as PostResult
  return res.data.post!
}

export const getFeaturedPosts = async ({
  tagIn,
  categoryName
}: {
  tagIn: string[]
  categoryName?: string
}) => {
  const res = (await fetchQuery({
    queryId: 'get-featured-posts',
    variables: {
      tagIn,
      categoryName
    }
  })) as PostsResult
  return res.data.posts!.nodes as Array<Post>
}

export const getLatestPosts = async ({
  tagNotIn,
  notIn,
  categoryName,
  first,
  after
}: {
  tagNotIn?: string[]
  notIn?: string[]
  categoryName?: string
  first?: number
  after?: string
}) => {
  const res = (await fetchQuery({
    queryId: 'get-latest-posts',
    variables: {
      tagNotIn,
      notIn,
      categoryName,
      first,
      after
    }
  })) as PostsResult
  return res.data.posts!.nodes as Array<Post>
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
  const res = (await fetchQuery({
    queryId: 'get-category-posts',
    variables: {
      categoryName,
      first,
      after,
      notIn
    }
  })) as PostsResult
  return res.data.posts!.nodes as Array<Post>
}

export const getRelatedPosts = async ({
  tagIn,
  notIn
}: {
  tagIn: string[]
  notIn: string[]
}) => {
  const res = (await fetchQuery({
    queryId: 'get-featured-posts',
    variables: {
      tagIn,
      notIn
    }
  })) as PostsResult
  return res.data.posts!.nodes as Array<Post>
}
