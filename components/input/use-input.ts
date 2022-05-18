import { syncRef } from "@vueuse/shared"
import { computed, getCurrentInstance, ref, Ref, watch } from "vue-demi"

export interface InputProps<V = string> {
  modelValue: V,
  readonly?: boolean,
  disabled?: boolean,
}

export function useVModel<V>(props: InputProps<V>): Ref<V> {
  const localValue = ref(props?.modelValue) as Ref<V>
  const { emit }   = getCurrentInstance()
  const model      = computed<V>({
    get () {
      return localValue.value
    },
    set (newValue) {
      if (!props.readonly && !props.disabled)
        emit('update:modelValue', newValue)
    },
  })

  syncRef(localValue, model)

  return model
}
