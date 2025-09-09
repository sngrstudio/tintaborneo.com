import type { RootQuery, Post, Tag, Category } from './types'
import execute, { gql } from './execute'

type PostResult = Pick<
  Post,
  | 'title'
  | 'uri'
  | 'date'
  | 'excerpt'
  | 'content'
  | 'featuredImage'
  | 'tags'
  | 'categories'
  | 'id'
>
type PostsQuery = Pick<RootQuery, 'posts'>

const getPostsGQL = gql`
  query GetPosts(
    $first: Int = 10
    $tag: String = ""
    $categoryName: String = ""
    $notIn: [ID] = ""
    $search: String = ""
  ) {
    posts(
      where: {
        tag: $tag
        categoryName: $categoryName
        notIn: $notIn
        search: $search
        orderby: { field: DATE, order: DESC }
        status: PUBLISH
      }
      first: $first
    ) {
      nodes {
        title
        uri
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            caption
          }
        }
        tags {
          nodes {
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
        id
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const getPosts = async ({
  first = 8,
  tag = '',
  categoryName = '',
  notIn = [],
  search = ''
}: {
  first?: number | undefined
  tag?: string | undefined
  categoryName?: string | undefined
  notIn?: string[] | undefined
  search?: string | undefined
}) => {
  const { data } = await execute<PostsQuery>(
    getPostsGQL,
    {
      first,
      tag,
      categoryName,
      notIn,
      search
    },
    { ttl: 60 }
  )
  return data.posts?.nodes.map((post: PostResult) => ({
    ...post,
    featuredImage: post.featuredImage?.node.sourceUrl || undefined,
    featuredImageCaption: post.featuredImage?.node.caption || undefined,
    tags: post.tags?.nodes.map((tag: Pick<Tag, 'name' | 'uri'>) => ({
      ...tag
    })),
    categories: post.categories?.nodes.map(
      (category: Pick<Category, 'name' | 'uri'>) => ({ ...category })
    ),
    pageInfo: {
      ...data.posts?.pageInfo
    }
  }))
}

type PostQuery = Pick<RootQuery, 'post'>

const getPostGQL = gql`
  query GetPost($id: ID!) {
    post(id: $id, idType: URI) {
      title
      uri
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          caption
        }
      }
      tags {
        nodes {
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
      id
    }
  }
`

export const getPost = async ({ id }: { id: string }) => {
  const { data } = await execute<PostQuery>(getPostGQL, { id }, { ttl: 60 })
  return {
    ...(data.post as PostResult | undefined),
    featuredImage: data.post?.featuredImage?.node.sourceUrl ?? undefined,
    featuredImageCaption: data.post?.featuredImage?.node.caption ?? undefined,
    tags: data.post?.tags?.nodes.map((tag: Pick<Tag, 'name' | 'uri'>) => ({
      ...tag
    })),
    categories: data.post?.categories?.nodes.map(
      (category: Pick<Category, 'name' | 'uri'>) => ({ ...category })
    )
  }
}
