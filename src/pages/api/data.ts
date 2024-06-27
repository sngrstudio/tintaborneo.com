import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ locals, url }) => {
  // @ts-ignore
  const { env } = locals.runtime

  const query = url.searchParams.get('query')
  const queryId = url.searchParams.get('queryId')
  const variables = url.searchParams.get('variables')

  try {
    const response = await fetch(
      [
        new URL('/wp/graphql', env.ADMIN_ENDPOINT),
        query ? `?query=${query}` : '',
        queryId ? `?queryId=${queryId}` : '',
        variables ? `&variables=${variables}` : ''
      ].join('')
    )

    const json = await response.json()
    if (json.errors) {
      json.errors.map((err: any) => {
        throw new Error(err.message)
      })
    }
    return new Response(JSON.stringify(json), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
    return new Response(
      error instanceof Error
        ? `Kesalahan: ${error.message}`
        : 'Kesalahan tidak diketahui',
      {
        status: 500
      }
    )
  }
}
