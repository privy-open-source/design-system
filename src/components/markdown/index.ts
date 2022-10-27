import { Directive } from 'vue-demi'
import { marked } from 'marked'
import { sanitize } from 'isomorphic-dompurify'

export interface MarkdownOption {
  /**
   * Use inline parsing
   * @default false
   * @link https://marked.js.org/using_advanced#inline
   */
  inline: boolean,
  /**
   * Disabled sanitize HTML result
   * @default false
   */
  unsecure: boolean,
}

/**
 * Parse markdown to html string
 * @param text markdown string
 * @param options parsing options
 */
export function markdown (text: string = '', options?: Partial<MarkdownOption>) {
  const html = options?.inline
    ? marked.parseInline(text)
    : marked.parse(text)

  if (html && !options?.unsecure)
    return sanitize(html)

  return html
}

export const pMd: Directive<HTMLElement, string> = (el, { value, modifiers }) => {
  el.innerHTML = markdown(value, {
    inline  : modifiers.inline,
    unsecure: modifiers.unsecure,
  })
}

export const vPMd = pMd
