const STATIC = import.meta.env.STATIC
const STATIC_ENDPOINT = import.meta.env.ADMIN_ENDPOINT
const SSR_ENDPOINT = import.meta.env.PROD
  ? import.meta.env.SITE
  : 'http://localhost:4321'

export type FetchQueryResult<T> = {
  data: T
  extensions: any
}

export const fetchQuery = async (
  queryId: string,
  variables?: Record<string, string | Array<string> | number | undefined>
) => {
  try {
    const response = await fetch(
      new URL(
        [
          STATIC ? '/wp/graphql' : '/api/data',
          `?queryId=${queryId}`,
          variables
            ? `&variables=${encodeURIComponent(JSON.stringify(variables))}`
            : ''
        ].join(''),
        STATIC ? STATIC_ENDPOINT : SSR_ENDPOINT
      )
    )
    const data = (await response.json()) as unknown
    return data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown Error')
    return null
  }
}
