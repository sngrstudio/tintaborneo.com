const GRAPHQL_ENDPOINT = `${import.meta.env.ADMIN_ENDPOINT}/wp/graphql`

export const gql = String.raw

type FetchQueryParams = {
  query?: ReturnType<typeof gql>
  queryId?: string
  variables?: Record<string, string | Array<string> | number | undefined>
}

export type FetchQueryResult<T> = {
  data: T
  extensions: any
}

export const fetchQuery = async ({
  query,
  queryId,
  variables
}: FetchQueryParams) => {
  try {
    const response = await fetch(
      [
        GRAPHQL_ENDPOINT,
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
