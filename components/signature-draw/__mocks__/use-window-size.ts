import { vi } from 'vitest'
import { ref } from 'vue-demi'

const width = ref(375)

const height = ref(667)

export const useWindowSize = vi.fn(() => {
  return {
    width : width,
    height: height,
  }
})

export function setWindow (w: number, h: number) {
  width.value  = w
  height.value = h
}
