import type { Interactable } from '@interactjs/types'
import {
  onScopeDispose,
  Ref,
  shallowRef,
  watch,
} from 'vue-demi'
import { DragHooks } from '../../pdf-object/utils/use-drag'

export default function useDrag (target: Ref<HTMLElement>, options: DragHooks = {}) {
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
        .on('tap', options.ontap)
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
