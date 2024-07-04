/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ENV = {
  ANALYTICS_ID: string
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
