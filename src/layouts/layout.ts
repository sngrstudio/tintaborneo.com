import type { Post } from '~/data/graphql'

export type LayoutProps = {
  title?: string
  description?: string
  post?: Post
}
