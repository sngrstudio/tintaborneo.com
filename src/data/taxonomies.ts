import type { RootQuery } from './graphql'
import { fetchData, gql } from './fetcher'

type CategoryFetched = {
  data: Pick<RootQuery, 'category'>
}

export const fetchCategory = async (id: string) => {
  return (await fetchData({
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
  })) as CategoryFetched
}

type TagFetched = {
  data: Pick<RootQuery, 'tag'>
}

export const fetchTag = async (id: string) => {
  return (await fetchData({
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
  })) as TagFetched
}

type UserFetched = {
  data: Pick<RootQuery, 'user'>
}

export const fetchUser = async (id: string) => {
  return (await fetchData({
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
  })) as UserFetched
}

type CategoriesFetched = {
  data: Pick<RootQuery, 'categories'>
}

export const fetchCategories = async () => {
  return (await fetchData({
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
  })) as CategoriesFetched
}
