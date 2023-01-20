import { createSpinner } from '../avatar/utils/create-image'
import {
  MaybeRef,
  tryOnMounted,
  tryOnBeforeUnmount,
} from '@vueuse/core'
import {
  Ref,
  ref,
  unref,
  watch,
} from 'vue-demi'

export function usePreview (file: MaybeRef<string | globalThis.File>, fallback = createSpinner(512, 512)): Ref<string> {
  const preview = ref(fallback)

  watch(() => unref(file), (value) => {
    if (preview.value?.startsWith('blob'))
      window.URL.revokeObjectURL(preview.value)

    preview.value = value instanceof globalThis.File
      ? window.URL.createObjectURL(value)
      : (value ?? fallback)
  })

  tryOnMounted(() => {
    const value = unref(file)

    if (value) {
      preview.value = value instanceof globalThis.File
        ? window.URL.createObjectURL(value)
        : value
    }
  })

  tryOnBeforeUnmount(() => {
    if (preview.value?.startsWith('blob'))
      window.URL.revokeObjectURL(preview.value)
  })

  return preview
}
