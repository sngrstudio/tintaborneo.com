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
          slug
          excerpt
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
            nodes {
              name
              uri
            }
          }
          tags {
            nodes {
              name
              uri
            }
          }
          postAdditionalField {
            city
          }
        }
      }
    `,
    variables: {
      id,
    },
  })) as PostFetched
}

type PostsFetched = {
  data: Pick<RootQuery, 'posts'>
}

export type FetchPostsArgs = {
  cursor?: string
  amount?: number
  author?: string
  category?: string
  tag?: string
  tagNotIn?: string | string[]
}

export const fetchPosts = async ({
  cursor,
  amount,
  author,
  category,
  tag,
  tagNotIn,
}: FetchPostsArgs) => {
  return (await fetchData({
    query: gql`
      query FetchPosts(
        $cursor: String = ""
        $amount: Int = 6
        $author: String = ""
        $category: String = ""
        $tag: String = ""
        $tagNotIn: [ID] = ""
      ) {
        posts(
          after: $cursor
          first: $amount
          where: {
            authorName: $author
            categoryName: $category
            tag: $tag
            orderby: { field: DATE, order: DESC }
            status: PUBLISH
            tagNotIn: $tagNotIn
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
            categories {
              nodes {
                name
                uri
              }
            }
            tags {
              nodes {
                name
                uri
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
      tagNotIn,
    },
  })) as PostsFetched
}

export type SearchPostsArgs = {
  cursor?: string
  search?: string
}

export const searchPosts = async ({ cursor, search }: SearchPostsArgs) => {
  return (await fetchData({
    query: gql`
      query SearchPosts($cursor: String = "", $search: String = "") {
        posts(
          after: $cursor
          where: {
            orderby: { field: DATE, order: DESC }
            status: PUBLISH
            search: $search
          }
          first: 12
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
      search,
    },
  })) as PostsFetched
}
