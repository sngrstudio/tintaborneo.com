import type { RootQuery } from './graphql'
import { fetchQuery, gql, type FetchQueryResult } from './fetch'

export const fetchCategory = async (id: string) => {
  return (await fetchQuery({
    query: gql`
      query FetchCategory($id: ID!) {
        category(id: $id, idType: SLUG) {
          id
          name
          description
          slug
          uri
          children {
            nodes {
              name
              slug
              uri
              posts {
                nodes {
                  uri
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'category'>>>
}

export const fetchTag = async (id: string) => {
  return (await fetchQuery({
    query: gql`
      query FetchTag($id: ID!) {
        tag(id: $id, idType: SLUG) {
          name
          slug
          uri
        }
      }
    `,
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'tag'>>>
}

export const fetchUser = async (id: string) => {
  return (await fetchQuery({
    query: gql`
      query FetchUser($id: ID!) {
        user(id: $id, idType: SLUG) {
          name
          description
          slug
          uri
        }
      }
    `,
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'user'>>>
}

export const fetchCategories = async () => {
  return (await fetchQuery({
    query: gql`
      query FetchCategories {
        categories(first: 128) {
          nodes {
            name
            slug
            uri
            parentId
          }
        }
      }
    `
  })) as FetchQueryResult<Required<Pick<RootQuery, 'categories'>>>
}
