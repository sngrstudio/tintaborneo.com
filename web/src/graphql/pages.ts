import type { RootQuery, Page } from './types'
import execute, { gql } from './execute'

type PagesResult = Array<Pick<Page, 'title' | 'uri' | 'content'>>
type PagesQuery = Pick<RootQuery, 'pages'>

const getPagesGQL = gql`
  query GetPages {
    pages(where: { status: PUBLISH }) {
      nodes {
        title
        uri
        content
      }
    }
  }
`

export const getPages = async () => {
  const { data } = await execute<PagesQuery>(
    getPagesGQL,
    {},
    { ttl: 60 * 60 * 24 * 30 }
  )
  return data.pages?.nodes as PagesResult
}
