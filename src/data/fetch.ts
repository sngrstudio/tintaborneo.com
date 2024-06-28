const STATIC_ENDPOINT_BASEURL = import.meta.env.ADMIN_ENDPOINT
const SSR_ENDPOINT_BASEURL = import.meta.env.PROD
  ? import.meta.env.SITE
  : 'http://localhost:4321'

export type FetchQueryResult<T> = {
  data: T
  extensions: any
}

export const fetchQuerySSR = async (
  queryId: string,
  variables?: Record<string, string | Array<string> | number | undefined>
) => {
  try {
    const response = await fetch(
      new URL(
        `/api/data?queryId=${queryId}${
          variables
            ? `&variables=${encodeURIComponent(JSON.stringify(variables))}`
            : ''
        }`,
        SSR_ENDPOINT_BASEURL
      )
    )
    const data = (await response.json()) as unknown
    return data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown Error')
    return null
  }
}

export const fetchQueryStatic = async (
  queryId: string,
  variables?: Record<string, string | Array<string> | number | undefined>
) => {
  try {
    const response = await fetch(
      new URL(
        `/wp/graphql?queryId=${queryId}${
          variables
            ? `&variables=${encodeURIComponent(JSON.stringify(variables))}`
            : ''
        }`,
        STATIC_ENDPOINT_BASEURL
      )
    )
    const data = (await response.json()) as unknown
    return data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown Error')
    return null
  }
}
