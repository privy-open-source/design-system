import { computed, getCurrentInstance } from "vue-demi"
import type { CheckboxProps } from "../checkbox/use-checkbox"
import { isEqual } from "../utils/value"

export type RadioProps = Omit<CheckboxProps, "uncheckedValue">

export function useVModel<P extends RadioProps>(props: P) {
  const { emit } = getCurrentInstance()
  const checked  = props.value ?? true

  const model = computed({
    get () {
      return isEqual(props.modelValue, checked)
    },
    set (value: boolean) {
      if (value)
        emit('update:modelValue', checked)
    },
  })

  return model
}
