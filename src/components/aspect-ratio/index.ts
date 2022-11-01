import { Directive } from 'vue-demi'

let observer: ResizeObserver

function getObserver () {
  if (!observer) {
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement
        const ratio  = Number.parseFloat(target.dataset.aspectRatio)
        const fixed  = target.dataset.aspectFixed === 'true'

        calculateSize(target, ratio, fixed)
      }
    })
  }

  return observer
}

function calculateSize (el: HTMLElement, ratio: number, fixed = false): void {
  if (Number.isFinite(ratio)) {
    const width  = el.clientWidth
    const height = width / ratio

    if (fixed)
      el.style.height = `${height}px`
    else
      el.style.minHeight = `${height}px`
  }
}

export const pAspectRatio: Directive<HTMLElement, number> = {
  mounted (el, { value, modifiers }) {
    el.dataset.aspectRatio = `${value}`
    el.dataset.aspectFixed = modifiers.fixed ? 'true' : 'false'

    calculateSize(el, value, modifiers.fixed)
    getObserver().observe(el)
  },

  updated (el, { value, modifiers }) {
    el.dataset.aspectRatio = `${value}`
    el.dataset.aspectFixed = modifiers.fixed ? 'true' : 'false'

    calculateSize(el, value, modifiers.fixed)
  },

  beforeUnmount (el) {
    getObserver().unobserve(el)
  },
}

export const vPAspectRatio = pAspectRatio
