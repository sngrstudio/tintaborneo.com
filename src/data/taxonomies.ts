import type { Category, RootQuery } from '~/graphql/types'
import { fetchQuery, type FetchQueryResult } from './fetch'

type TagResult = FetchQueryResult<Pick<RootQuery, 'tag'>>
type CategoryResult = FetchQueryResult<Pick<RootQuery, 'category'>>
type CategoriesResult = FetchQueryResult<Pick<RootQuery, 'categories'>>

export const getTag = async (id: string) =>
  ((await fetchQuery('get-tag-id', { variables: { id } })) as TagResult).data
    .tag

export const getCategory = async (id: string) =>
  (
    (await fetchQuery('get-category-id', {
      variables: { id }
    })) as CategoryResult
  ).data.category

export const getCategories = async () =>
  ((await fetchQuery('get-categories')) as CategoriesResult).data.categories
    ?.nodes as Array<Category>
