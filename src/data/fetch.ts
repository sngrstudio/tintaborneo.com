const ENDPOINT_BASEURL = import.meta.env.PROD
  ? import.meta.env.SITE
  : 'http://localhost:4321'

export const fetchDynamicQuery = async (
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
        ENDPOINT_BASEURL
      )
    )
    const data = (await response.json()) as unknown
    return data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown Error')
    return null
  }
}
