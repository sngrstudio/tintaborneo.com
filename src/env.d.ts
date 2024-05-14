/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ADMIN_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  Alpine: import('alpinejs').Alpine
}

import 'react'
declare module 'react' {
  export interface HTMLAttributes<T> {
    tw?: string
  }
}
