import type { InteractEvent, Interactable } from '@interactjs/types'
import {
  onScopeDispose,
  Ref,
  shallowRef,
  watch,
} from 'vue-demi'

export interface DragHooks {
  onstart?: (event: InteractEvent) => void,
  onmove?: (event: InteractEvent) => void,
  onend?: (event: InteractEvent) => void,
}

export default function useDrag (target: Ref<HTMLElement>, hooks?: DragHooks) {
  const enable   = shallowRef(true)
  const instance = shallowRef<Interactable>()

  async function init () {
    destroy()

    if (target.value) {
      const { default: Interact } = await import('interactjs')

      // Interact.dynamicDrop(true)

      instance.value = Interact(target.value)
        .draggable({
          inertia  : true,
          enabled  : enable.value,
          onstart  : hooks.onstart,
          onmove   : hooks.onmove,
          onend    : hooks.onend,
          modifiers: [
            Interact.modifiers.restrict({
              restriction: 'body',
              elementRect: {
                top   : 0,
                left  : 0,
                bottom: 1,
                right : 1,
              },
            }),
          ],
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
