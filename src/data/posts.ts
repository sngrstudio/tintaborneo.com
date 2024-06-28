import type { RootQuery } from '~/graphql/types'
import { fetchQuerySSR, type FetchQueryResult } from './fetch'

type PostResult = FetchQueryResult<Pick<RootQuery, 'post'>>

export const getPost = async (id: string) =>
  ((await fetchQuerySSR('get-post', { id })) as PostResult).data.post
