import type { InteractEvent } from '@interactjs/types'
import type { Ref } from 'vue-demi'
import type { DrawHooks } from '../utils/use-draw'

let hooks: DrawHooks

export function useDraw (target: Ref<HTMLElement>, option?: DrawHooks) {
  hooks = option
}

export function triggerDraw () {
  hooks.onstart({ pageX: 0, pageY: 0 } as unknown as InteractEvent)
  hooks.onmove({ pageX: 50, pageY: 50 } as unknown as InteractEvent)
}
