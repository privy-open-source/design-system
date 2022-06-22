import { syncRef } from '@vueuse/shared'
import {
  computed, getCurrentInstance, ref, Ref,
} from 'vue-demi'

export interface InputProps<V = string> {
  modelValue: V,
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

  syncRef(localValue, model)

  return localValue
}
