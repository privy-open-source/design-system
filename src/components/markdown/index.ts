import type { Directive } from 'vue-demi'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import defu from 'defu'

export interface MarkdownOption {
  /**
   * Use inline parsing
   * @link https://marked.js.org/using_advanced#inline
   */
  inline: boolean,
  /**
   * Disabled sanitize HTML result
   */
  unsecure: boolean,
  /**
   * marked options
   */
  marked: marked.MarkedOptions,
}

/**
 * Parse markdown to html string
 * @param text markdown string
 * @param options parsing options
 */
export function markdown (text = '', _option: Partial<MarkdownOption>) {
  const options = defu(_option, {
    inline  : false,
    unsecure: false,
    marked  : { mangle: false, headerIds: false },
  })

  const html = options.inline
    ? marked.parseInline(text, options.marked)
    : marked.parse(text, options.marked)

  if (html && !options.unsecure)
    return sanitizeHtml(html)

  return html
}

export const pMd: Directive<HTMLElement, string> = (el, { value, modifiers }) => {
  el.innerHTML = markdown(value, {
    inline  : modifiers.inline,
    unsecure: modifiers.unsecure,
  })
}

export const vPMd = pMd
