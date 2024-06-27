const BASE_ENDPOINT = import.meta.env.PROD
  ? import.meta.env.SITE
  : 'http://localhost:4321'
const GRAPHQL_STATIC_ENDPOINT = new URL(
  '/wp/graphql',
  import.meta.env.ADMIN_ENDPOINT
)

export const gql = String.raw

type FetchQueryParams = {
  query?: ReturnType<typeof gql>
  queryId?: string
  variables?: Record<string, string | Array<string> | number | undefined>
  mode?: 'static' | 'dynamic'
}

export type FetchQueryResult<T> = {
  data: T
  extensions: any
}

export const fetchQuery = async ({
  query,
  queryId,
  variables,
  mode = 'dynamic'
}: FetchQueryParams) => {
  try {
    const response = await fetch(
      [
        mode === 'static'
          ? GRAPHQL_STATIC_ENDPOINT
          : new URL(`/api/data`, BASE_ENDPOINT),
        query ? `?query=${encodeURIComponent(query)}` : '',
        queryId ? `?queryId=${queryId}` : '',
        variables
          ? `&variables=${encodeURIComponent(JSON.stringify(variables))}`
          : ''
      ].join('')
    )

    const json = await response.json()
    if (json.errors) {
      json.errors.map((err: any) => {
        throw new Error(err.message)
      })
    }
    return json as unknown
  } catch (error) {
    console.error(error)
    return null
  }
}
