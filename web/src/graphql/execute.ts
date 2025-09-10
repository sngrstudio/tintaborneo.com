const ENDPOINT = process.env.CONTENT_ENDPOINT

export const gql = String.raw

type ExecuteResult<T> =
  | {
      data: T
      errors?: undefined
      extensions: any
    }
  | {
      data?: undefined
      errors: Array<Record<string, any>>
      extensions: any
    }

type CacheOptions = { ttl?: number } // seconds
type CacheEntry<T> = { value: { data: T; extensions: any }; expiresAt: number }

// Simple in-memory cache for server-side use (single-process)
const memoryCache = new Map<string, CacheEntry<any>>()
const DEFAULT_TTL_SECONDS = 30

function cacheKey(query: string, variables: Record<string, any>) {
  // Produce a compact deterministic hash (FNV-1a 32-bit) from the JSON payload.
  // Implemented with plain JS so no external dependency is required.
  const payload = JSON.stringify({ query, variables })
  // FNV-1a 32-bit
  let hash = 2166136261 >>> 0
  for (let i = 0; i < payload.length; i++) {
    hash ^= payload.charCodeAt(i)
    // multiply by FNV prime 16777619 (mod 2^32)
    hash = Math.imul(hash, 16777619) >>> 0
  }
  // return hex string
  return hash.toString(16)
}

const execute = async <TResult>(
  query: ReturnType<typeof gql>,
  variables: Record<string, string | Array<string> | number> = {},
  cache: CacheOptions = { ttl: DEFAULT_TTL_SECONDS }
): Promise<{ data: TResult; extensions: any }> => {
  const ttlMs = (cache?.ttl ?? DEFAULT_TTL_SECONDS) * 1000
  const key = cacheKey(query, variables)
  const now = Date.now()

  const cached = memoryCache.get(key) as CacheEntry<TResult> | undefined
  if (cached && cached.expiresAt > now) {
    return cached.value
  }

  // Build GET URL with query and variables encoded
  const url = new URL(String(`${ENDPOINT}/wp/graphql`))
  const params = new URLSearchParams()
  params.set('query', String(query))
  if (variables && Object.keys(variables).length > 0) {
    params.set('variables', JSON.stringify(variables))
  }
  // If the endpoint already has search params, preserve them
  url.search = url.search
    ? `${url.search}&${params.toString()}`
    : params.toString()

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/graphql-response+json'
    }
  })

  if (!res.ok) {
    throw new Error("Error: Can't retrieve GraphQL data.")
  }

  const result = (await res.json()) as ExecuteResult<TResult>
  if (result.errors) {
    throw new Error(`GraphQL Error occured: ${result.errors[0]?.message}`)
  }

  // At this point TS should treat `result` as the success shape, but narrow explicitly
  const ok = result as { data: TResult; errors?: undefined; extensions: any }

  // Store in memory cache
  if (ttlMs > 0) {
    memoryCache.set(key, {
      value: { data: ok.data, extensions: ok.extensions },
      expiresAt: Date.now() + ttlMs
    })
  }

  return { data: ok.data, extensions: ok.extensions }
}

export default execute
