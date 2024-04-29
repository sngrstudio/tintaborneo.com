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

type CategoryWithPostsFetched = {
  data: Pick<RootQuery, 'category'>
}

export const fetchCategoryWithPosts = async (id: string) => {
  return (await fetchData({
    query: gql`
      query FetchCategoryWithPosts($id: ID!) {
        category(id: $id, idType: SLUG) {
          name
          uri
          posts {
            edges {
              node {
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
          }
        }
      }
    `,
    variables: {
      id,
    },
  })) as CategoryWithPostsFetched
}
