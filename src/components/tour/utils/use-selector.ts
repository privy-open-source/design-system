import {
  tryOnMounted,
  useMutationObserver,
  MaybeRef,
} from '@vueuse/core'
import {
  ref,
  Ref,
  watch,
  unref,
} from 'vue-demi'

export function useSelector<E extends HTMLElement> (selector: MaybeRef<string>): Readonly<Ref<E>> {
  const element = ref<E>()
  const body    = ref()

  watch(() => unref(selector), (value) => {
    element.value = document.querySelector(value)
  })

  useMutationObserver(body, ([mutation]) => {
    if (mutation.type === 'childList')
      element.value = document.querySelector(unref(selector))
  }, { childList: true, subtree: true })

  tryOnMounted(() => {
    body.value    = document.body
    element.value = document.querySelector(unref(selector))
  })

  return element
}
