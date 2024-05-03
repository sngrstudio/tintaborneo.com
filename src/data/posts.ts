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

type PostsFetched = {
  data: Pick<RootQuery, 'posts' | 'user'>
}

export type FetchPostsArgs = {
  cursor?: string
  amount?: number
  author?: string
  category?: string
  categoryNotIn?: Array<string> | undefined
  tag?: string
}

export const fetchPosts = async ({
  cursor,
  amount,
  author,
  category,
  categoryNotIn,
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
        $categoryNotIn: [ID] = ""
      ) {
        posts(
          after: $cursor
          first: $amount
          where: {
            authorName: $author
            categoryName: $category
            tag: $tag
            orderby: { field: DATE, order: DESC }
            categoryNotIn: $categoryNotIn
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
                id
                name
                slug
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
      categoryNotIn,
      tag,
    },
  })) as PostsFetched
}
