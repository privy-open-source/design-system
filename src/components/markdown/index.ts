import type { Directive } from 'vue-demi'
import type { MarkedOptions } from 'marked'
import { parse, parseInline } from 'marked'
import { sanitize } from '@jill64/universal-sanitizer'
import defu from 'defu'
import { escape } from 'html-escaper'

export interface MarkdownOption {
  /**
   * Use inline parsing
   * @link https://marked.js.org/using_advanced#inline
   */
  inline: boolean,
  /**
   * Escape value char before encode
   */
  escape: boolean,
  /**
   * Disabled sanitize HTML result
   */
  unsecure: boolean,
  /**
   * marked options
   */
  marked: MarkedOptions,
}

/**
 * Parse markdown to html string
 * @param text markdown string
 * @param options parsing options
 */
export function markdown (text = '', _option: Partial<MarkdownOption> = {}) {
  const options = defu(_option, {
    inline  : false,
    escape  : false,
    unsecure: false,
    marked  : { mangle: false, headerIds: false },
  })

  const value = options.escape ? escape(text) : text
  const html  = options.inline
    ? parseInline(value, options.marked) as string
    : parse(value, options.marked) as string

  if (html && !options.unsecure)
    return sanitize(html)

  return html
}

export const pMd: Directive<HTMLElement, string> = (el, { value, modifiers }) => {
  el.innerHTML = markdown(value, {
    escape  : modifiers.escape,
    inline  : modifiers.inline,
    unsecure: modifiers.unsecure,
  })
}

export const vPMd = pMd
