import { useSingleton } from '../global/use-singleton'
import Overlay from './Overlay.vue'

export async function showOverlay () {
  // eslint-disable-next-line unicorn/no-await-expression-member
  (await useSingleton(Overlay)).show()
}

export async function hideOverlay () {
  // eslint-disable-next-line unicorn/no-await-expression-member
  (await useSingleton(Overlay)).hide()
}
