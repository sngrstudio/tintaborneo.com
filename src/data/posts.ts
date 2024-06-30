import type { RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type PostResult = FetchQueryResult<Pick<RootQuery, 'post'>>
type PostsResult = FetchQueryResult<Pick<RootQuery, 'posts'>>

export const getPost = async (id: string) =>
  ((await fetchQuery('get-post', { id })) as PostResult).data.post

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
      notIn,
      tagNotIn,
      categoryName,
      first,
      after
    })) as PostsResult
  ).data.posts!

export const getFeaturedPosts = async ({
  categoryName
}: {
  categoryName?: string
} = {}) =>
  (
    (await fetchQuery('get-featured-posts-2', {
      categoryName
    })) as PostsResult
  ).data.posts!

export const getRelatedPosts = async ({
  notIn,
  tagIn
}: {
  notIn: Array<string>
  tagIn: Array<string>
}) =>
  ((await fetchQuery('get-related-posts', { notIn, tagIn })) as PostsResult)
    .data.posts!
