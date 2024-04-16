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
