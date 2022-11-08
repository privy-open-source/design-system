import { Side, Placement } from '@floating-ui/dom'
import { DirectiveBinding } from 'vue-demi'
import type { ColorVariant } from '..'

/**
 * Parse placement from modifier
 */
export function parsePlacement (_el: HTMLElement, { modifiers }: DirectiveBinding): Placement {
  /**
   * Modifier               👉 Result
   * -------------------------------
   * -                      👉 'top'
   * start                  👉 'top-start'
   * end                    👉 'top-end
   * top                    👉 'top'
   * left                   👉 'left'
   * right                  👉 'right'
   * bottom                 👉 'bottom'
   * top + start            👉 'top-start'
   * left + start           👉 'left-start'
   * right + start          👉 'right-start'
   * bottom + start         👉 'bottom-start'
   * top + end              👉 'top-end'
   * left + end             👉 'left-end'
   * right + end            👉 'right-end'
   * bottom + end           👉 'bottom-end'
   * top + left             👉 'top-start'
   * top + right            👉 'top-end'
   * bottom + left          👉 'bottom-start'
   * bottom + right         👉 'bottom-end'
   */

  let result: Placement

  if (modifiers.top)
    result = 'top'
  else if (modifiers.bottom)
    result = 'bottom'

  if (result) {
    if (modifiers.left)
      result = `${result as Side}-start`
    else if (modifiers.right)
      result = `${result as Side}-end`
  } else {
    if (modifiers.right)
      result = 'right'
    else if (modifiers.left)
      result = 'left'
  }

  if (!result)
    result = 'top'

  if (modifiers.start && !result.endsWith('start'))
    result = `${result as Side}-start`
  else if (modifiers.end && !result.endsWith('end'))
    result = `${result as Side}-end`

  return result
}

/**
 * Parse action from modifier
 */
export function parseAction (_el: HTMLElement, { modifiers }: DirectiveBinding): string {
  const result: string[] = []

  if (modifiers.focus)
    result.push('focus')

  if (modifiers.hover)
    result.push('hover')

  if (modifiers.click)
    result.push('click')

  return result.join('-') || 'focus-hover'
}

/**
 * Parse value from element or bindings value
 * @param el binding element
 * @param bindings directive bindings options
 */
export function parseText (el: HTMLElement, bindings: DirectiveBinding<string | boolean>): string {
  if (typeof bindings.value === 'string')
    return bindings.value

  if (el.hasAttribute('title'))
    return el.getAttribute('title')

  return el.dataset.tooltipText ?? ''
}

/**
 * Parse color from modifiers
 * @param _el (unsuded)
 */
export function parseColor (_el: HTMLElement, { modifiers }: DirectiveBinding): ColorVariant {
  return modifiers.white ? 'white' : 'black'
}
