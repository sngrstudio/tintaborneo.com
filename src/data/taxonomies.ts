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
          name
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
      id,
    },
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
      id,
    },
  })) as TagFetched
}

type UserFetched = {
  data: Pick<RootQuery, 'tag'>
}

export const fetchUser = async (id: string) => {
  return (await fetchData({
    query: gql`
      query FetchUser($id: ID!) {
        user(id: $id, idType: SLUG) {
          name
          slug
          uri
        }
      }
    `,
    variables: {
      id,
    },
  })) as UserFetched
}
