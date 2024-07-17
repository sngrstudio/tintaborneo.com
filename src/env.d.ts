/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type KVNamespace = import("@cloudflare/workers-types").KVNamespace;
type ENV = {
  ADMIN_ENDPOINT: string
  ANALYTICS_ENDPOINT?: string
  ANALYTICS_ID?: string
  TB_CACHING: KVNamespace
}

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>
declare namespace App {
  interface Locals extends Runtime {
    isrTTL: number
    cache: (number) => void
  }
}

// import 'react'
// declare module 'react' {
//   export interface HTMLAttributes<T> {
//     tw?: string
//   }
// }
