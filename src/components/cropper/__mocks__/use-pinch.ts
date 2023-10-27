import type { GestureEvent, InteractEvent } from '@interactjs/types'
import type { Ref } from 'vue-demi'
import { nextTick } from 'vue-demi'
import type { EventHooks } from '../utils/use-pinch'

let hooks: EventHooks

export function usePinch (target: Ref<HTMLElement>, options: EventHooks) {
  hooks = options
}

export async function triggerPinch (scale: number, dx: number, dy: number) {
  if (hooks.onstart)
    hooks.onstart({} as unknown as InteractEvent)

  if (hooks.onpinch) {
    hooks.onpinch({
      scale,
      dx,
      dy,
    } as unknown as GestureEvent)
  }

  await nextTick()
}

export async function triggerDrag (dx: number, dy: number) {
  if (hooks.onstart)
    hooks.onstart({} as unknown as InteractEvent)

  if (hooks.onmove)
    hooks.onmove({ dx, dy } as unknown as InteractEvent)

  await nextTick()
}
