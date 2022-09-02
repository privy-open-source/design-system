import '@interactjs/auto-start'
import '@interactjs/actions/drag'
import Interact from '@interactjs/interact'
import { InteractEvent } from '@interactjs/types'
import { throttle } from 'lodash'
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
  onMounted(() => {
    if (target.value) {
      const onmove = throttle(hooks.onmove, 1000 / 120 /* limit 120fps */)

      Interact(target.value)
        .styleCursor(false)
        .draggable({
          origin : 'self',
          inertia: true,
          onstart: hooks.onstart,
          onmove : onmove,
          onend  : onmove,
        })
    }
  })

  onBeforeUnmount(() => {
    Interact(target.value).unset()
  })
}
