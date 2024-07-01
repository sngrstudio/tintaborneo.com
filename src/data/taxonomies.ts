import type { RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type TagResult = FetchQueryResult<Pick<RootQuery, 'tag'>>
type CategoryResult = FetchQueryResult<Pick<RootQuery, 'category'>>

export const getTag = async (id: string) =>
  ((await fetchQuery('get-tag-id', { id })) as TagResult).data.tag

export const getCategory = async (id: string) =>
  ((await fetchQuery('get-category-id', { id })) as CategoryResult).data
    .category
