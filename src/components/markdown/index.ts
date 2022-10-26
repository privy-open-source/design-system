import { Directive } from 'vue-demi'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export function markdown (text: string, { inline = false, sanitize = true }) {
  const html = inline
    ? marked.parseInline(text)
    : marked.parse(text)

  return sanitize ? DOMPurify.sanitize(html) : html
}

export const pMd: Directive<HTMLElement, string> = (el, { value, modifiers }) => {
  el.innerHTML = markdown(value, {
    inline  : modifiers.inline,
    sanitize: !modifiers.unsecure,
  })
}

export const vPMd = pMd
