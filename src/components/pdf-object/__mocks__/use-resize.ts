import type { InteractEvent } from '@interactjs/types'
import type { ResizeOptions } from '../utils/use-resize'
import {
  nextTick,
  ref,
  Ref,
} from 'vue-demi'

let options: ResizeOptions

export default function useResize (target: Ref<HTMLElement>, options_: ResizeOptions = {}) {
  options = options_

  return ref(true)
}

export async function triggerResize (width: number, height: number) {
  options.onmove({ rect: { width, height } } as unknown as InteractEvent)

  await nextTick()
}
