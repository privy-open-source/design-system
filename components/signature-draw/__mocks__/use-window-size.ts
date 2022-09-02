import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'

const width = ref(375)

const height = ref(667)

const isDesktop = ref(true)

export const useWindowSize = vi.fn(() => {
  return {
    width : width,
    height: height,
  }
})

export const useMediaQuery = vi.fn(() => {
  return isDesktop
})

export function setWindow (w: number, h: number) {
  width.value  = w
  height.value = h
}

export async function setMediaQuery (type: 'desktop' | 'mobile') {
  isDesktop.value = type === 'desktop'

  await nextTick()
}
