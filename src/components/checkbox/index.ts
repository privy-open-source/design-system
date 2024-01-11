import { syncRef } from '@vueuse/shared'
import {
  computed,
  getCurrentInstance,
  ref,
} from 'vue-demi'
import type { InputProps } from '../input'
import { valueIn, isEqual } from '../utils/value'

function isChecked (modelValue: unknown, checked: unknown): boolean {
  if (Array.isArray(modelValue))
    return valueIn(modelValue, checked)

  return isEqual(modelValue, checked)
}

export interface CheckboxProps extends InputProps<unknown> {
  checked: boolean,
  value: unknown,
  uncheckedValue: unknown,
}

export function useVModel (props: CheckboxProps) {
  const { emit }   = getCurrentInstance()
  const localValue = ref(isChecked(props.modelValue, props.value) || props.checked)
  const model      = computed({
    get () {
      return isChecked(props.modelValue, props.value) || props.checked
    },
    set (value: boolean) {
      const newValue = value ? props.value : props.uncheckedValue

      if (Array.isArray(props.modelValue)) {
        if (value) {
          if (!valueIn(props.modelValue, newValue))
            emit('update:modelValue', [...props.modelValue, newValue])
        } else
          emit('update:modelValue', props.modelValue.filter((old) => !isEqual(old, props.value)))
      } else
        emit('update:modelValue', newValue)
    },
  })

  syncRef(localValue, model, { immediate: false })

  return localValue
}
