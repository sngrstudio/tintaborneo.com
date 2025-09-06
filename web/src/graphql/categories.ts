import type { RootQuery, Category } from './types'
import execute, { gql } from './execute'

type CategoryResult = Pick<Category, 'name' | 'slug' | 'uri' | 'children'>
type CategoriesQuery = Pick<RootQuery, 'categories'>

const getCategoriesGQL = gql`
  query GetCategories {
    categories(first: 100) {
      nodes {
        name
        slug
        uri
        children {
          nodes {
            name
            slug
            uri
            children {
              nodes {
                name
                slug
                uri
              }
            }
          }
        }
      }
    }
  }
`

export const getCategories = async () => {
  const { data } = await execute<CategoriesQuery>(
    getCategoriesGQL,
    {},
    { ttl: 60 * 60 * 24 * 30 }
  )
  return data.categories?.nodes.map((category: CategoryResult) => ({
    ...category,
    children: category.children?.nodes.map((child: CategoryResult) => ({
      ...child,
      children: child.children?.nodes.map(
        (gChild: Omit<CategoryResult, 'children'>) => ({
          ...gChild
        })
      )
    }))
  }))
}
