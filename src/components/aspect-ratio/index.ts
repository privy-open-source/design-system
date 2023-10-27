import type { Directive } from 'vue-demi'
import { calculateRatio } from './utils/calculate-ratio'
import { getObserver } from './utils/resize-observer'

export const pAspectRatio: Directive<HTMLElement, number> = {
  async mounted (el, { value, modifiers }) {
    const observer = await getObserver()

    el.dataset.aspectRatio = `${value}`
    el.dataset.aspectFixed = modifiers.fixed ? 'true' : 'false'

    calculateRatio(el, value, !!modifiers.fixed)
    observer.observe(el)
  },

  updated (el, { value, modifiers }) {
    el.dataset.aspectRatio = `${value}`
    el.dataset.aspectFixed = modifiers.fixed ? 'true' : 'false'

    calculateRatio(el, value, !!modifiers.fixed)
  },

  async beforeUnmount (el) {
    const observer = await getObserver()

    observer.unobserve(el)
  },
}

export const vPAspectRatio = pAspectRatio
