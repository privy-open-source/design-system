import { createSpinner } from '../../avatar/utils/create-image'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue-demi'
import {
  ref,
  unref,
  watchEffect,
} from 'vue-demi'

export function usePreview (file: MaybeRef<string | globalThis.File>, fallback = createSpinner(512, 512)): Ref<string> {
  const preview = ref(fallback)

  watchEffect((onCleanup) => {
    const value = unref(file)

    if (typeof window !== 'undefined' && value instanceof globalThis.File) {
      const url = window.URL.createObjectURL(value)

      onCleanup(() => {
        window.URL.revokeObjectURL(url)
      })

      preview.value = url
    } else
      preview.value = (typeof value === 'string' && value) ? value : fallback
  })

  return preview
}
