interface Env {}

export const onRequest: PagesFunction<Env> = () => {
  return new Response(JSON.stringify({ hello: 'world!' }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
