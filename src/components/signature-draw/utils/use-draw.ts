import type { InteractEvent } from '@interactjs/types'
import { throttle } from 'lodash-es'
import {
  onBeforeUnmount,
  onMounted,
  Ref,
} from 'vue-demi'

export interface DrawHooks {
  onstart?: (event: InteractEvent) => void,
  onmove?: (event: InteractEvent) => void,
}

export default function useDraw (target: Ref<HTMLCanvasElement>, hooks?: DrawHooks) {
  onMounted(async () => {
    if (target.value) {
      const { default: Interact } = await import('interactjs')
      const onmove                = throttle(hooks.onmove, 1000 / 120 /* limit 120fps */)

      Interact(target.value)
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
    const { default: Interact } = await import('interactjs')

    Interact(target.value).unset()
  })
}
