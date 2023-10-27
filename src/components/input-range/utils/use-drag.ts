import type { InteractEvent, Interactable } from '@interactjs/types'
import { throttle } from 'lodash-es'
import type { Ref } from 'vue-demi'
import {
  onBeforeUnmount,
  shallowRef,
  watch,
} from 'vue-demi'

export default function useDrag (target: Ref<HTMLElement>, handler: (event: InteractEvent) => void) {
  const instance = shallowRef<Interactable>()

  watch(target, async (element) => {
    if (instance.value)
      instance.value.unset()

    if (element) {
      const { default: Interact } = await import('interactjs')
      const onmove                = throttle(handler, 1000 / 120 /* limit 120fps */)

      instance.value = Interact(element)
        .styleCursor(false)
        .draggable({ onmove: onmove })
    }
  })

  onBeforeUnmount(async () => {
    if (instance.value)
      instance.value.unset()
  })
}
