import { syncRef, useToNumber } from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import {
  computed,
  getCurrentInstance,
  ref,
  toRef,
  watch,
} from 'vue-demi'

export interface InputRangeProps {
  modelValue: number | [number, number],
  start: number,
  end: number,
  multiple: boolean,
  max: number | string,
  min: number | string,
  step: number | string,
}

export function useVModel (props: InputRangeProps) {
  const min  = useToNumber(toRef(props, 'min', 1))
  const max  = useToNumber(toRef(props, 'max', 100))
  const step = useToNumber(toRef(props, 'step', 1))

  // Initial value
  const localStart = ref(Array.isArray(props.modelValue) ? props.modelValue[0] : (props.start ?? min.value))
  const localEnd   = ref(Array.isArray(props.modelValue) ? props.modelValue[1] : (props.end ?? props.modelValue ?? max.value))

  const minDrag = computed(() => props.multiple ? localStart.value + step.value : min.value)
  const maxDrag = computed(() => props.multiple ? localEnd.value - step.value : max.value)

  const start    = useClamp(localStart.value, min, maxDrag)
  const end      = useClamp(localEnd.value, minDrag, max)
  const { emit } = getCurrentInstance()

  const startValue = computed({
    get () {
      if (Array.isArray(props.modelValue))
        return props.modelValue[0]

      return props.start ?? min.value
    },
    set (value: number) {
      emit('update:start', value)
    },
  })

  const endValue = computed({
    get () {
      if (Array.isArray(props.modelValue))
        return props.modelValue[1]

      if (props.modelValue)
        return props.modelValue

      return props.end ?? max.value
    },
    set (value: number) {
      emit('update:end', value)
    },
  })

  const startPercentage = computed(() => {
    const value = (start.value - min.value) / (max.value - min.value)

    return Number.isFinite(value) ? value : 0
  })

  const endPercentage = computed(() => {
    const value = (end.value - min.value) / (max.value - min.value)

    return Number.isFinite(value) ? value : 1
  })

  syncRef(start, startValue)
  syncRef(end, endValue)

  watch([start, end], ([startVal, endVal]) => {
    localStart.value = startVal
    localEnd.value   = endVal

    if (props.multiple)
      emit('update:modelValue', [startVal, endVal])
    else
      emit('update:modelValue', endVal)
  })

  return {
    min,
    max,
    step,
    start,
    end,
    startPercentage,
    endPercentage,
  }
}
