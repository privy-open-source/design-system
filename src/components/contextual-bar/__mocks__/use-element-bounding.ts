import { nextTick, ref } from 'vue-demi'

export const height = ref(0)

export function useElementBounding () {
  return { height }
}

export async function simulateHeightChanged (newHeight: number) {
  height.value = newHeight

  await nextTick()
  await nextTick()
}
