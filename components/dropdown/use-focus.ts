import { focusable } from "tabbable"
import { Ref } from "vue-demi"

export function useFocus (target: Ref<HTMLElement>) {
  function travel (step: number) {
    const elements    = focusable(target.value)
    const index       = elements.findIndex((el) => el === document.activeElement)
    const targetFocus = elements.at((index + step) % elements.length)

    if (targetFocus)
      targetFocus.focus()
  }

  function next () {
    travel(1)
  }

  function prev () {
    travel(-1)
  }

  return {
    next,
    prev,
  }
}
