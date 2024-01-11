import { syncRef } from '@vueuse/core'
import type { Ref } from 'vue-demi'
import {
  computed,
  getCurrentInstance,
  ref,
} from 'vue-demi'

export interface InputProps<V = string> {
  modelValue?: V,
}

export function useVModel<V> (props: InputProps<V>): Ref<V> {
  const localValue = ref(props.modelValue) as Ref<V>
  const { emit }   = getCurrentInstance()

  const model = computed<V>({
    get () {
      return props.modelValue
    },
    set (value) {
      emit('update:modelValue', value)
    },
  })

  syncRef<unknown, unknown>(localValue, model, { immediate: false })

  return localValue
}

export {
  type AcceptVariant,
  isAccepted,
  removeUnaccepted,
  checkOnInput,
} from './utils/accept'
