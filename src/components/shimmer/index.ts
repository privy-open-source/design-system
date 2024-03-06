import type { Directive } from 'vue-demi'

export const vBindOnce: Directive = {
  created (el, binding) {
    el.setAttribute(binding.arg, binding.value)
  },
  getSSRProps (binding) {
    if (binding.arg && binding.value)
      return { [binding.arg]: binding.value }

    return {}
  },
}

export function genId () {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
