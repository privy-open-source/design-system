import {
  onBeforeUnmount,
  onMounted,
  Ref,
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
          onstart: hooks.onstart,
          onmove : onpinch,
          onend  : onpinch,
        })
        .draggable({
          onstart: hooks.onstart,
          onmove : onmove,
          onend  : onmove,
        })
    }
  })

  onBeforeUnmount(async () => {
    instance.value?.unset()
  })
}
