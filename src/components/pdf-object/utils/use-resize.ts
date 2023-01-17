import type { Interactable, InteractEvent } from '@interactjs/types'
import { MaybeRef } from '@vueuse/core'
import {
  onScopeDispose,
  Ref,
  shallowRef,
  unref,
  watch,
} from 'vue-demi'

export interface ResizeOptions {
  onstart?: (event: InteractEvent) => void,
  onmove?: (event: InteractEvent) => void,
  onend?: (event: InteractEvent) => void,

  handleSelector?: string,
  reference?: MaybeRef<HTMLElement>,
  minWidth?: MaybeRef<number>,
  maxWidth?: MaybeRef<number>,
  minHeight?: MaybeRef<number>,
  maxHeight?: MaybeRef<number>,
  scale?: MaybeRef<number>,
  ratio?: MaybeRef<number>,
}

export default function useResize (target: Ref<HTMLElement>, options: ResizeOptions = {}) {
  const enable   = shallowRef(true)
  const instance = shallowRef<Interactable>()

  async function init () {
    destroy()

    if (target.value) {
      const { default: Interact } = await import('interactjs')

      // Interact.dynamicDrop(true)

      instance.value = Interact(target.value)
        .resizable({
          enabled: enable.value,
          edges  : {
            left  : false,
            top   : false,
            bottom: options.handleSelector ?? '.resize-handle',
            right : options.handleSelector ?? '.resize-handle',
          },
          onstart  : options.onstart,
          onmove   : options.onmove,
          onend    : options.onend,
          modifiers: [
            Interact.modifiers.aspectRatio({
              ratio    : unref(options.ratio) ?? 'preserve',
              modifiers: [
                Interact.modifiers.restrictSize({
                  min: (x, y, element) => {
                    const scale = unref(options.scale) ?? 1

                    return {
                      ...element.rect,
                      width : unref(options.minWidth) * scale,
                      height: unref(options.minHeight) * scale,
                    }
                  },
                  max: (x, y, element) => {
                    const scale = unref(options.scale) ?? 1

                    return {
                      ...element.rect,
                      width : unref(options.maxWidth) * scale,
                      height: unref(options.maxHeight) * scale,
                    }
                  },
                }),
                Interact.modifiers.restrictSize({
                  max: (x, y, element) => {
                    const reference = unref(options.reference)

                    if (reference) {
                      const bounding = Interact.getElementRect(reference)

                      if (bounding) {
                        const width  = (bounding.right - element.rect.left)
                        const height = (bounding.bottom - element.rect.top)

                        return {
                          ...bounding,
                          width,
                          height,
                        }
                      }
                    }

                    return {
                      ...element.rect,
                      width : Number.POSITIVE_INFINITY,
                      height: Number.POSITIVE_INFINITY,
                    }
                  },
                }),
              ],
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
  }, { immediate: true })

  onScopeDispose(() => {
    destroy()
  })

  return enable
}
