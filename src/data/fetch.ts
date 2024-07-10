const SSR_ENDPOINT = import.meta.env.PROD
  ? import.meta.env.SITE
  : 'http://localhost:4321'

export type FetchQueryResult<T> = {
  data: T
  extensions: any
}

type FetchQueryVariables = Record<
  string,
  string | Array<string> | number | undefined
>

type FetchQueryOptions = {
  variables?: FetchQueryVariables
  ttl?: number
}

export const fetchQuery = async (
  queryId: string,
  options?: FetchQueryOptions
) => {
  try {
    const response = await fetch(
      new URL(
        [
          '/api/data',
          `?queryId=${queryId}`,
          options?.variables
            ? `&variables=${encodeURIComponent(JSON.stringify(options?.variables))}`
            : '',
          options?.ttl ? `&ttl=${options.ttl}` : ''
        ].join(''),
        SSR_ENDPOINT
      )
    )

    const data = (await response.json()) as unknown
    return data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown Error')
    return null
  }
}
