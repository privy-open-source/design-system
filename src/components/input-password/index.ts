import { MaybeRef, watchDebounced } from '@vueuse/core'
import {
  ref,
  unref,
} from 'vue-demi'

export function usePasswordStrength (input: MaybeRef<string>) {
  const score = ref(0)

  watchDebounced(() => unref(input), async (value) => {
    if (value) {
      const { default: zxcvbn } = await import('zxcvbn')
      const result              = zxcvbn(value)

      score.value = Math.round((result.score / 4 * 6) + 1)
    } else
      score.value = 0
  }, { debounce: 300 })

  return score
}
