import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ locals, url }) => {
  // @ts-ignore
  const { env } = locals.runtime

  const generateCacheKey = async (queryId: string, variables?: string) => {
    const variablesHash = variables
      ? [
          ...new Uint8Array(
            await crypto.subtle.digest(
              'SHA-1',
              new TextEncoder().encode(variables)
            )
          )
        ]
          .map((x) => x.toString(16).padStart(2, '0'))
          .join('')
      : undefined
    return `query--${queryId}${variablesHash ? `--${variablesHash}` : ''}${env.MODE ? `--${env.MODE}` : ''}`
  }

  const queryId = url.searchParams.get('queryId')
  const variables = url.searchParams.get('variables')
  const ttl = url.searchParams.get('ttl')

  try {
    if (!queryId) {
      throw new Error('No queryId provided')
    }

    const cacheKey = await generateCacheKey(queryId, variables || undefined)
    let data

    data = await env.TB_CACHING.get(cacheKey)
    // console.log(data)

    if (data === null) {
      const response = await fetch(
        `${env.ADMIN_ENDPOINT}/wp/graphql?queryId=${queryId}${variables ? `&variables=${encodeURIComponent(variables)}` : ''}`
      )

      const json = await response.json()
      if (json.errors) throw new Error(json.errors[0].message)
      await env.TB_CACHING.put(cacheKey, JSON.stringify(json), {
        expirationTtl: ttl ? parseInt(ttl) : undefined
      })
      data = JSON.stringify(json)
    }

    console.log(data)

    return new Response(data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify(
        error instanceof Error
          ? { error: error.message }
          : { error: 'Terjadi error yang tidak diketahui.' }
      ),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
