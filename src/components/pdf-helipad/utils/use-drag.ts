import type { InteractEvent, Interactable } from '@interactjs/types'
import {
  onScopeDispose,
  Ref,
  shallowRef,
  watch,
} from 'vue-demi'

export interface DragOptions {
  scale: Ref<number>,
  width: Ref<number>,
  height: Ref<number>,

  onstart?: (event: InteractEvent) => void,
  onmove?: (event: InteractEvent) => void,
  onend?: (event: InteractEvent) => void,
}

export default function useDrag (target: Ref<HTMLElement>, options?: DragOptions) {
  const enable   = shallowRef(true)
  const instance = shallowRef<Interactable>()

  const {
    // width,
    // height,
    // scale,
    onstart,
    onmove,
    onend,
  } = options

  async function init () {
    destroy()

    if (target.value) {
      const { default: Interact } = await import('interactjs')

      instance.value = Interact(target.value)
        .draggable({
          inertia   : true,
          enabled   : enable.value,
          autoScroll: true,
          onstart   : onstart,
          onmove    : onmove,
          onend     : onend,
          // modifiers : [
          // Interact.modifiers.restrictRect({
          //   restriction: () => {
          //     // const rect = Interact.getElementRect(target.value)

          //     return {
          //       top   : 0,
          //       left  : 0,
          //       right :  window.innerWidth,
          //       bottom: window.scrollY + window.innerHeight,
          //     }
          //   },
          // }),
          // ],
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
