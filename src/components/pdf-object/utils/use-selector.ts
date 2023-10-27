import type { MaybeRef } from '@vueuse/core'
import {
  tryOnMounted,
  useMutationObserver,
} from '@vueuse/core'
import type { Ref } from 'vue-demi'
import {
  watch,
  unref,
  shallowRef,
} from 'vue-demi'

export function useSelector<E extends HTMLElement> (selector: MaybeRef<string>, container?: MaybeRef<HTMLElement>, all?: false): Readonly<Ref<E>>
export function useSelector<E extends HTMLElement> (selector: MaybeRef<string>, container?: MaybeRef<HTMLElement>, all?: true): Readonly<Ref<NodeListOf<E>>>
export function useSelector<E extends HTMLElement> (selector: MaybeRef<string>, container: MaybeRef<HTMLElement> = document.body, all = false) {
  const element = shallowRef<E | NodeListOf<E>>()

  function getElement () {
    element.value = all
      ? unref(container)?.querySelectorAll<E>(unref(selector))
      : unref(container)?.querySelector<E>(unref(selector))
  }

  watch(() => unref(selector), () => {
    getElement()
  })

  useMutationObserver(container, (mutations) => {
    if (mutations.some((mutation) => mutation.type === 'childList'))
      getElement()
  }, { childList: true, subtree: true })

  tryOnMounted(() => {
    getElement()
  })

  return element
}
