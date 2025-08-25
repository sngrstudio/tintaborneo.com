import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ url }) => {
  const queryId = url.searchParams.get('queryId')
  const variables = url.searchParams.get('variables')

  try {
    if (!queryId) {
      throw new Error('No queryId provided')
    }

    const response = await fetch(
      `${import.meta.env.ADMIN_ENDPOINT}/wp/graphql?queryId=${queryId}${variables ? `&variables=${encodeURIComponent(variables)}` : ''}`
    )
    const data = await response.json()

    if (data.errors) throw new Error(data.errors[0].message)

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify(
        error instanceof Error
          ? { error: error.message }
          : { error: 'Something went wrong' }
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
