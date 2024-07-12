import type { Interactable } from '@interactjs/types'
import type { Ref } from 'vue-demi'
import {
  onScopeDispose,
  shallowRef,
  watch,
} from 'vue-demi'
import { usePspdf } from '..'

export default function useDrop (target: Ref<HTMLElement>) {
  const enable              = shallowRef(true)
  const instance            = shallowRef<Interactable>()
  const { instance: pspdf } = usePspdf()

  async function init () {
    destroy()

    if (target.value) {
      const { default: Interact } = await import('interactjs')

      Interact.dynamicDrop(true)

      instance.value = Interact(target.value)
        .dropzone({
          accept : '.pdf-object',
          overlap: 0.95,
          enabled: enable.value,
          checker (dragEvent, event, dropped, dropzone, dropzoneElement, draggable, draggableElement) {
            // Check only child of this target can dropped in here
            return dropped && (target.value?.contains(draggableElement) || draggableElement.classList.contains('pdf-object--external'))
          },
          ondrop (event) {
            if (event.relatedTarget)
              event.relatedTarget.instance = pspdf.value
          },
        })
    }
  }

  watch(target, async () => {
    await init()
  })

  function destroy () {
    if (instance.value)
      instance.value.unset()
  }

  onScopeDispose(() => {
    destroy()
  })

  return enable
}
