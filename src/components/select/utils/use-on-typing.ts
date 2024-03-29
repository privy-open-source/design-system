import { watchDebounced } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { watch } from 'vue-demi'

export function onStartTyping (model: Ref<string>, handler: () => void) {
  watch(model, handler)
}

export function onFinishTyping (model: Ref<string>, handler: () => void, debounceTime = 500) {
  watchDebounced(model, handler, { debounce: debounceTime })
}
