/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ENV = {
  ANALYTICS_ID: string
}

declare namespace App {
  interface Locals {}
}

import 'react'
declare module 'react' {
  export interface HTMLAttributes<T> {
    tw?: string
  }
}
