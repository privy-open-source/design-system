import type { InteractEvent, Interactable } from '@interactjs/types'
import { throttle } from 'lodash-es'
import type { Ref } from 'vue-demi'
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
} from 'vue-demi'

export interface DrawHooks {
  onstart?: (event: InteractEvent) => void,
  onmove?: (event: InteractEvent) => void,
}

export default function useDraw (target: Ref<HTMLCanvasElement>, hooks?: DrawHooks) {
  const instance = shallowRef<Interactable>()

  onMounted(async () => {
    if (target.value) {
      const { default: Interact } = await import('interactjs')
      const onmove                = throttle(hooks.onmove, 1000 / 60 /* limit 60fps */)

      instance.value = Interact(target.value)
        .styleCursor(false)
        .draggable({
          origin : 'self',
          inertia: { enabled: true, resistance: 10 },
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
