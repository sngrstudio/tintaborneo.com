import type { RootQuery, Post } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type PostResult = FetchQueryResult<Pick<RootQuery, 'post'>>
type PostsResult = FetchQueryResult<Pick<RootQuery, 'posts'>>

export const getPost = async (id: string) =>
  ((await fetchQuery('get-post', { id })) as PostResult).data.post

export const getRelatedPosts = async ({
  notIn,
  tagIn
}: {
  notIn: Array<string>
  tagIn: Array<string>
}) =>
  ((await fetchQuery('get-related-posts', { notIn, tagIn })) as PostsResult)
    .data.posts?.nodes as Array<Post>
