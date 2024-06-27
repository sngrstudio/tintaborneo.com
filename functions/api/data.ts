interface Env {}

export const onRequest: PagesFunction<Env> = () => {
  return new Response('Hello, world!', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
