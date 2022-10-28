import { Directive } from 'vue-demi'

export const pAspectRatio: Directive<HTMLElement, number> = (el, { value, modifiers }) => {
  const width  = el.clientWidth
  const height = width / value

  if (modifiers.fixed)
    el.style.height = `${height}px`
  else
    el.style.minHeight = `${height}px`
}
