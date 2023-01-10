import type { InteractEvent, Interactable } from '@interactjs/types'
import {
  inject,
  onScopeDispose,
  Ref,
  shallowRef,
  watch,
} from 'vue-demi'
import { DROPZONE_CONTEXT_SYMBOL } from './use-drop'

export interface DragHooks {
  onstart?: (event: InteractEvent) => void,
  onmove?: (event: InteractEvent) => void,
  onend?: (event: InteractEvent) => void,
}

export default function useDrag (target: Ref<HTMLElement>, hooks?: DragHooks) {
  const enable        = shallowRef(true)
  const instance      = shallowRef<Interactable>()
  const { hoverzone } = inject(DROPZONE_CONTEXT_SYMBOL)

  async function init () {
    destroy()

    if (target.value) {
      const { default: Interact } = await import('interactjs')

      // Interact.dynamicDrop(true)

      instance.value = Interact(target.value)
        .draggable({
          inertia   : true,
          enabled   : enable.value,
          autoScroll: {
            container: target.value.parentElement,
            margin   : 100,
            speed    : 300,
          },
          onstart  : hooks.onstart,
          onmove   : hooks.onmove,
          onend    : hooks.onend,
          modifiers: [
            Interact.modifiers.restrict({
              restriction: 'parent',
              elementRect: {
                top   : 0,
                left  : 0,
                bottom: 1,
                right : 1,
              },
            }),
            Interact.modifiers.restrictRect({
              endOnly    : true,
              restriction: () => {
                if (hoverzone.value)
                  return Interact.getElementRect(hoverzone.value)

                // fallback
                return {
                  top   : 0,
                  left  : 0,
                  bottom: Number.POSITIVE_INFINITY,
                  right : Number.POSITIVE_INFINITY,
                }
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
