import type { RootQuery } from './graphql'
import { fetchData, gql } from './fetcher'

type PostFetched = {
  data: Pick<RootQuery, 'post'>
}

export const fetchPost = async (id: string) => {
  return (await fetchData({
    query: gql`
      query FetchPost($id: ID!) {
        post(id: $id, idType: SLUG) {
          title
          date
          uri
          content
          featuredImage {
            node {
              sourceUrl
              caption
              altText
            }
          }
          author {
            node {
              name
              uri
            }
          }
          categories {
            edges {
              node {
                name
                uri
                slug
                parentId
              }
            }
          }
        }
      }
    `,
    variables: {
      id,
    },
  })) as PostFetched
}

type PostsByCategoryFetched = {
  data: Pick<RootQuery, 'posts' | 'category'>
}

export const fetchPostsByCategory = async (id: string, first?: number) => {
  return (await fetchData({
    query: gql`
      query FetchPostsByCategory($id: ID!, $category: String!, $first: Int!) {
        posts(where: { categoryName: $category }, first: $first) {
          nodes {
            title
            excerpt
            uri
            date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
        }
        category(id: $id, idType: SLUG) {
          name
          uri
        }
      }
    `,
    variables: {
      id,
      first: first || 6,
      category: id,
    },
  })) as PostsByCategoryFetched
}

type PostsByUserFetched = {
  data: Pick<RootQuery, 'posts' | 'user'>
}

export const fetchPostsByUser = async (id: string) => {
  return (await fetchData({
    query: gql`
      query FetchPostsByUser($id: ID!, $user: String!) {
        posts(where: { authorName: $user }, first: 12) {
          nodes {
            title
            excerpt
            uri
            date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
        }
        user(id: $id, idType: SLUG) {
          name
          uri
        }
      }
    `,
    variables: {
      id,
      user: id,
    },
  })) as PostsByUserFetched
}

type PostsFetched = {
  data: Pick<RootQuery, 'posts' | 'user'>
}

export type FetchPostsArgs = {
  cursor?: string
  amount?: number
  author?: string
  category?: string
  tag?: string
}

export const fetchPosts = async ({
  cursor,
  amount,
  author,
  category,
  tag,
}: FetchPostsArgs) => {
  return (await fetchData({
    query: gql`
      query FetchPosts(
        $cursor: String = ""
        $amount: Int = 6
        $author: String = ""
        $category: String = ""
        $tag: String = ""
      ) {
        posts(
          after: $cursor
          first: $amount
          where: {
            authorName: $author
            categoryName: $category
            tag: $tag
            orderby: { field: DATE, order: DESC }
          }
        ) {
          nodes {
            title
            excerpt
            uri
            date
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
    variables: {
      cursor,
      amount,
      author,
      category,
      tag,
    },
  })) as PostsFetched
}
