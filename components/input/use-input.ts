import { computed, getCurrentInstance, ref, Ref, watch } from "vue-demi"

export interface InputProps<V = string> {
  modelValue: V,
  readonly?: boolean,
  disabled?: boolean,
}

export function useVModel<V>(props: InputProps<V>): Ref<V> {
  const temp  = ref(props?.modelValue) as Ref<V>
  const vm    = getCurrentInstance()
  const model = computed<V>({
    get () {
      return temp.value
    },
    set (value) {
      if (!props.readonly && !props.disabled) {
        temp.value = value

        if (vm?.emit)
          vm.emit('update:modelValue', value)
      }
    },
  })

  watch(() => props.modelValue, (value) => {
    temp.value = value
  })

  return model
}
