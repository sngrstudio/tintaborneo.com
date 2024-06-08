import type { RootQuery } from './graphql'
import { fetchQuery, gql, type FetchQueryResult } from './experimental_fetch'

export const fetchPost = async (id: string) => {
  return (await fetchQuery({
    query: gql`
      query FetchPost($id: ID!) {
        post(id: $id, idType: SLUG) {
          id
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
              id
            }
          }
          postAdditionalField {
            city
          }
        }
      }
    `,
    variables: {
      id
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'post'>>>
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
  tagNotIn
}: FetchPostsArgs) => {
  return (await fetchQuery({
    query: gql`
      query FetchPosts(
        $cursor: String = ""
        $amount: Int = 8
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
      tagNotIn
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>
}

export type FetchRelatedPostsArgs = {
  amount?: number
  tagIn: string[]
  notIn: string[]
}

export const fetchRelatedPosts = async ({
  tagIn,
  notIn,
  amount
}: FetchRelatedPostsArgs) => {
  return (await fetchQuery({
    query: gql`
      query FetchRelatedPosts($tagIn: [ID]!, $notIn: [ID]!, $amount: Int = 8) {
        posts(
          first: $amount
          where: {
            orderby: { field: DATE, order: DESC }
            status: PUBLISH
            tagIn: $tagIn
            notIn: $notIn
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
        }
      }
    `,
    variables: {
      amount,
      tagIn,
      notIn
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>
}

export type SearchPostsArgs = {
  cursor?: string
  search?: string
}

export const searchPosts = async ({ cursor, search }: SearchPostsArgs) => {
  return (await fetchQuery({
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
      search
    }
  })) as FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>
}
