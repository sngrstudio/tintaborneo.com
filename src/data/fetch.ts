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

const generateCacheKey = async (
  queryId: string,
  variables?: FetchQueryVariables
) => {
  const variablesHash = variables
    ? [
        ...new Uint8Array(
          await crypto.subtle.digest(
            'SHA-1',
            new TextEncoder().encode(JSON.stringify(variables))
          )
        )
      ]
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('')
    : undefined
  return `${queryId}${variablesHash ? `--${variablesHash}` : ''}`
}

export const fetchQuery = async (
  queryId: string,
  options?: FetchQueryOptions
) => {
  try {
    let data: unknown
    const cacheKey = await generateCacheKey(queryId, options?.variables)
    console.log(cacheKey)

    const response = await fetch(
      new URL(
        [
          '/api/data',
          `?queryId=${queryId}`,
          options?.variables
            ? `&variables=${encodeURIComponent(JSON.stringify(options?.variables))}`
            : ''
        ].join(''),
        SSR_ENDPOINT
      )
    )

    data = (await response.json()) as unknown
    return data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown Error')
    return null
  }
}
