import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ url, locals }, next) => {
    const { env } = locals.runtime;
    const isrCache = env.TB_CACHING
    const path = url.pathname

    let response: Response
    let expirationTtl: number | undefined = undefined
    locals.cache = (seconds: number) => {
        expirationTtl = seconds
    }

    response = await next()
    if (expirationTtl) {
        isrCache.put(path, JSON.stringify(response), { expirationTtl })
    }


    return response;
})