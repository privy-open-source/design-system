import {
  computed, nextTick, ref,
} from 'vue-demi'

const screenWidth = ref(0)

export const useMediaQuery = (query: string) => {
  const minWidth = Number.parseInt(query.replace(/\D/g, ''))
  const result   = computed(() => {
    return screenWidth.value >= minWidth
  })

  return result
}

export async function setScreenWidth (width: number) {
  screenWidth.value = width

  await nextTick()
}
