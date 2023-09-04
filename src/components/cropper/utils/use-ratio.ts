import { computed, ComputedRef } from 'vue-demi'

export interface RatioProp {
  width?: number | string,
  height?: number | string,
  ratio?: number,
}

export function useRatio (props: RatioProp, defaultValue = 1): ComputedRef<number> {
  return computed(() => {
    if (props.width && props.height)
      return Number.parseFloat(`${props.width}`) / Number.parseFloat(`${props.height}`)

    return props.ratio ?? defaultValue
  })
}

export function useRatioWidth (props: RatioProp): ComputedRef<number | undefined> {
  return computed(() => {
    if (props.width)
      return Number.parseFloat(`${props.width}`)

    if (props.height && props.ratio)
      return Number.parseFloat(`${props.height}`) * props.ratio
  })
}

export function useRatioHeight (props: RatioProp): ComputedRef<number | undefined> {
  return computed(() => {
    if (props.height)
      return Number.parseFloat(`${props.height}`)

    if (props.width && props.ratio)
      return Number.parseFloat(`${props.width}`) / props.ratio
  })
}
