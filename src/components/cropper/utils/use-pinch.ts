import type { Ref } from 'vue-demi'
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
} from 'vue-demi'
import type {
  InteractEvent,
  Interactable,
  GestureEvent,
} from '@interactjs/types'
import { throttle } from 'lodash-es'

export interface EventHooks {
  onstart?: (event: InteractEvent) => void,
  onpinch?: (event: GestureEvent) => void,
  onmove?: (event: InteractEvent) => void,
}

export function usePinch (target: Ref<HTMLElement>, hooks: EventHooks) {
  const instance = shallowRef<Interactable>()

  onMounted(async () => {
    if (target.value) {
      const { default: Interact } = await import('interactjs')
      const onmove                = throttle(hooks.onmove, 1000 / 120 /* limit 120fps */)
      const onpinch               = throttle(hooks.onpinch, 1000 / 120 /* limit 120fps */)

      instance.value = Interact(target.value)
        .styleCursor(true)
        .gesturable({
          inertia  : true,
          onstart  : hooks.onstart,
          onmove   : onpinch,
          onend    : onpinch,
          modifiers: [
            Interact.modifiers.restrict({
              restriction: 'parent',
              endOnly    : true,
            }),
          ],
        })
        .draggable({
          inertia  : true,
          onstart  : hooks.onstart,
          onmove   : onmove,
          onend    : onmove,
          modifiers: [
            Interact.modifiers.restrict({
              restriction: 'parent',
              endOnly    : true,
            }),
          ],
        })
    }
  })

  onBeforeUnmount(async () => {
    instance.value?.unset()
  })
}
