import type { Post } from '~/data/graphql'
import type { GetPictureResult } from '~/utils/image'

export interface PostWithOptimizedImage extends Post {
  optimizedImage: GetPictureResult
}

export interface PostsData {
  posts: Array<PostWithOptimizedImage>
}
