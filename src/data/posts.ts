import type { RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type PostResult = FetchQueryResult<Pick<RootQuery, 'post'>>
type PostsResult = FetchQueryResult<Pick<RootQuery, 'posts'>>

export const getPost = async (id: string) =>
  (
    (await fetchQuery('get-post', {
      variables: { id },
      ttl: 2628000
    })) as PostResult
  ).data.post

export const getLatestPosts = async ({
  notIn,
  tagNotIn,
  categoryName,
  first,
  after
}: {
  notIn?: Array<string>
  tagNotIn?: Array<string>
  categoryName?: string
  first?: number
  after?: string
}) =>
  (
    (await fetchQuery('get-latest-posts', {
      variables: {
        notIn,
        tagNotIn,
        categoryName,
        first,
        after
      },
      ttl: 300
    })) as PostsResult
  ).data.posts!

export const getFeaturedPosts = async ({
  categoryName
}: {
  categoryName?: string
} = {}) =>
  (
    (await fetchQuery('get-featured-posts-2', {
      variables: { categoryName },
      ttl: 300
    })) as PostsResult
  ).data.posts!

export const getRelatedPosts = async ({
  notIn,
  tagIn,
  after
}: {
  notIn: Array<string>
  tagIn: Array<string>
  after?: string
}) =>
  (
    (await fetchQuery('get-related-posts-2', {
      variables: { notIn, tagIn, after },
      ttl: 86400
    })) as PostsResult
  ).data.posts!

export const getPostsBySearch = async ({
  search,
  after,
  first
}: {
  search?: string
  after?: string
  first?: number
}) =>
  (
    (await fetchQuery('get-posts-by-search', {
      variables: { search, after, first },
      ttl: 3600
    })) as PostsResult
  ).data.posts!
