import { computed, getCurrentInstance, ref } from "vue-demi"
import type { CheckboxProps } from "../checkbox/use-checkbox"

export type RadioProps = Omit<CheckboxProps, "uncheckedValue">

export function useVModel<P extends RadioProps>(props: P) {
  const { emit } = getCurrentInstance()
  const checked  = props.value ?? true

  const model = computed({
    get () {
      return JSON.stringify(props.modelValue) === JSON.stringify(checked)
    },
    set (value: boolean) {
      if (value)
        emit('update:modelValue', checked)
    },
  })

  return model
}
