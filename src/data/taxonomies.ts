import type { RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type TagResult = FetchQueryResult<Pick<RootQuery, 'tag'>>

export const getTag = async (id: string) =>
  ((await fetchQuery('get-tag-id', { id })) as TagResult).data.tag
