
import { syncRef } from "@vueuse/shared"
import { computed, getCurrentInstance, ref, watch } from "vue-demi"

function isEqual (a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

function valueIn (array: unknown[], value: unknown): boolean {
  return array.some((item) => isEqual(item, value))
}

function isChecked (modelValue: unknown, checked: unknown): boolean {
  if (Array.isArray(modelValue))
    return valueIn(modelValue, checked)

  return isEqual(modelValue, checked)
}

export interface CheckboxProps {
  modelValue: unknown,
  checked: boolean,
  value: unknown,
  uncheckedValue: unknown,
}

export function useVModel<P extends CheckboxProps> (props: P) {
  const { emit } = getCurrentInstance()
  const value    = ref(false)

  const checked   = props.value ?? true
  const unchecked = props.uncheckedValue ?? false

  const model = computed({
    get () {
      return isChecked(props.modelValue, checked) || props.checked
    },
    set (value: boolean) {
      const newValue = value ? checked : unchecked

      if (Array.isArray(props.modelValue)) {
        if (value === true) {
          if (!valueIn(props.modelValue, newValue))
            emit('update:modelValue', [...props.modelValue, newValue])
        } else
          emit('update:modelValue', props.modelValue.filter((old) => !isEqual(old, checked)))
      } else
        emit('update:modelValue', newValue)
    }
  })

  syncRef(value, model)

  watch(() => props.checked, (newValue) => {
    value.value = newValue
  }, { immediate: true })

  return value
}
