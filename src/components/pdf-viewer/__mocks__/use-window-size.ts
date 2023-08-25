import { ref } from 'vue-demi'

const height = ref(0)

export function setWindowSize (size: number) {
  height.value = size
}

export function useWindowSize () {
  return { height }
}
