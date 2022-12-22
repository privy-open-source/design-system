import type { InteractEvent, Interactable } from '@interactjs/types'
import { throttle } from 'lodash-es'
import {
  onBeforeUnmount,
  onMounted,
  Ref,
  shallowRef,
} from 'vue-demi'

export default function useDrag (target: Ref<HTMLElement>, handler: (event: InteractEvent) => void) {
  const instance = shallowRef<Interactable>()

  onMounted(async () => {
    if (target.value) {
      const { default: Interact } = await import('interactjs')
      const onmove                = throttle(handler, 1000 / 120 /* limit 120fps */)

      instance.value = Interact(target.value)
        .styleCursor(false)
        .draggable({ onmove: onmove })
    }
  })

  onBeforeUnmount(async () => {
    instance.value?.unset()
  })
}
