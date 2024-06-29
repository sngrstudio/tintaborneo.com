import type { RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type PostResult = FetchQueryResult<Pick<RootQuery, 'post'>>

export const getPost = async (id: string) =>
  ((await fetchQuery('get-post', { id })) as PostResult).data.post
