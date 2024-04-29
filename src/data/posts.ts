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

export const fetchPostsByCategory = async (id: string) => {
  return (await fetchData({
    query: gql`
      query FetchPostsByCategory($id: ID!, $category: String!) {
        posts(where: { categoryName: $category }, first: 6) {
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
      category: id,
    },
  })) as PostsByCategoryFetched
}
