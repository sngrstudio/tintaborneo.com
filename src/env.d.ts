/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type KVNamespace = import('@cloudflare/workers-types').KVNamespace
type ENV = {
  ADMIN_ENDPOINT: string
  ANALYTICS_ID: string
  MODE: string
  TINTABORNEO_KV: KVNamespace
}

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>
declare namespace App {
  interface Locals extends Runtime {}
}

import 'react'
declare module 'react' {
  export interface HTMLAttributes<T> {
    tw?: string
  }
}
