import { clamp } from 'lodash-es'
import { focusable } from 'tabbable'
import type { Ref } from 'vue-demi'

export function useFocus (target: Ref<HTMLElement>, loop = true) {
  function travel (step: number) {
    const elements    = focusable(target.value)
    const index       = elements.indexOf(document.activeElement as HTMLElement)
    const nextIndex   = loop ? ((index + step) % elements.length) : clamp(index + step, 0, elements.length - 1)
    const targetFocus = elements.at(nextIndex)

    if (targetFocus !== undefined)
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
