import { toRef, computed } from 'vue-demi'
import { useToNumber } from '@vueuse/core'

interface ProgressbarProp {
  min: number | string,
  max: number | string,
  value: number | string,
}

export function useProgressbar (props: ProgressbarProp) {
  const min   = useToNumber(toRef(props, 'min'), { nanToZero: true })
  const max   = useToNumber(toRef(props, 'max'), { nanToZero: true })
  const value = useToNumber(toRef(props, 'value'), { nanToZero: true })

  const presentage = computed(() => {
    return (value.value - min.value) / (max.value - min.value)
  })

  return presentage
}
