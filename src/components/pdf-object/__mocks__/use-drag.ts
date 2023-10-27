import type { InteractEvent } from '@interactjs/types'
import type { Ref } from 'vue-demi'
import {
  nextTick,
  ref,
} from 'vue-demi'
import type { DragHooks } from '../utils/use-drag'

let options: DragHooks

export default function useDrag (target: Ref<HTMLElement>, options_: DragHooks = {}) {
  options = options_

  return ref(true)
}

export async function triggerDragStart () {
  options.onstart({} as unknown as InteractEvent)

  await nextTick()
  await nextTick()
  await nextTick()
}

export async function triggerDragMove (event: Partial<InteractEvent>) {
  options.onmove(event as InteractEvent)

  await nextTick()
  await nextTick()
  await nextTick()
}

export async function triggerDragEnd (relatedTarget?: HTMLDivElement) {
  options.onend({ relatedTarget } as unknown as InteractEvent)

  await nextTick()
  await nextTick()
  await nextTick()
}

export async function triggerTap () {
  options.ontap({} as unknown as InteractEvent)

  await nextTick()
  await nextTick()
  await nextTick()
}
