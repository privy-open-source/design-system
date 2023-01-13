import type {
  Interactable,
  InteractEvent,
} from '@interactjs/types'
import { useMutationObserver } from '@vueuse/core'
import {
  InjectionKey,
  onScopeDispose,
  provide,
  ref,
  Ref,
  shallowRef,

} from 'vue-demi'

export interface DropzoneContext {
  dropzone: Ref<HTMLElement>,
  hoverzone: Ref<HTMLElement>,
}

export const DROPZONE_CONTEXT_SYMBOL: InjectionKey<DropzoneContext> = Symbol('DropzoneContext')

export default function useDrop (target: Ref<HTMLElement>, dropTarget: Ref<string>) {
  const enable   = shallowRef(true)
  const instance = shallowRef<Interactable>()

  const dropzone  = ref<HTMLElement>()
  const hoverzone = ref<HTMLElement>()

  async function init () {
    destroy()

    if (target.value) {
      const { default: Interact } = await import('interactjs')

      // Interact.dynamicDrop(true)

      instance.value = Interact(dropTarget.value, { context: target.value })
        .dropzone({
          accept : '.pdf-object',
          overlap: 0.95,
          enabled: enable.value,
          checker (dragEvent, event, dropped, dropzone, dropzoneElement, draggable, draggableElement) {
            // Check only child of this target can dropped in here
            return dropped && (target.value.contains(draggableElement) || draggableElement.classList.contains('pdf-object--external'))
          },
          ondragenter (event: InteractEvent) {
            hoverzone.value = event.target as HTMLElement

            event.target.classList.add('hover')
          },
          ondragleave (event: InteractEvent) {
            event.target.classList.remove('hover')
          },
          ondrop (event: InteractEvent) {
            hoverzone.value = event.target as HTMLElement
            dropzone.value  = event.target as HTMLElement

            event.target.classList.remove('hover')
          },
        })
    }
  }

  function destroy () {
    if (instance.value)
      instance.value.unset()
  }

  useMutationObserver(target, (mutations) => {
    const isChildChanged = mutations.some((mutation) => {
      return mutation.type === 'childList'
        && (mutation.target as HTMLElement).matches(dropTarget.value)
    })

    if (isChildChanged)
      void init()
  }, { subtree: true, childList: true })

  onScopeDispose(() => {
    destroy()
  })

  provide(DROPZONE_CONTEXT_SYMBOL, { dropzone, hoverzone })

  return enable
}
