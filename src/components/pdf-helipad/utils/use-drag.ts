import type { InteractEvent, Interactable } from '@interactjs/types'
import {
  onScopeDispose,
  Ref,
  shallowRef,
  watch,
} from 'vue-demi'

export interface DragOptions {
  onstart?: (event: InteractEvent) => void,
  onmove?: (event: InteractEvent) => void,
  onend?: (event: InteractEvent) => void,
}

export default function useDrag (target: Ref<HTMLElement>, options: DragOptions = {}) {
  const enable   = shallowRef(true)
  const instance = shallowRef<Interactable>()

  async function init () {
    destroy()

    if (target.value) {
      const { default: Interact } = await import('interactjs')

      instance.value = Interact(target.value)
        .draggable({
          inertia   : true,
          enabled   : enable.value,
          autoScroll: true,
          onstart   : options.onstart,
          onmove    : options.onmove,
          onend     : options.onend,
        })
    }
  }

  function destroy () {
    if (instance.value)
      instance.value.unset()
  }

  watch(target, async () => {
    await init()
  })

  watch(enable, (value) => {
    if (instance.value)
      instance.value.draggable(value)
  })

  onScopeDispose(() => {
    destroy()
  })

  return enable
}
