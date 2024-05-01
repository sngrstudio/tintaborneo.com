import type { Alpine } from 'alpinejs'
// @ts-ignore
import intersect from '@alpinejs/intersect'

export default (Alpine: Alpine) => {
  Alpine.plugin(intersect)
}
