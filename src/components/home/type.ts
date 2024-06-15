import type { Post } from '~/data/graphql'
import type { GetPictureResult } from '~/utils/image'

export interface PostWithOptimizedImage extends Post {
  optimizedImage?: GetPictureResult
}

export interface PostsData {
  posts: Array<PostWithOptimizedImage>
}

export interface PostsCollection {
  posts: Array<Array<PostWithOptimizedImage>>
}

export type Experimental_PostsData = Array<PostWithOptimizedImage>
