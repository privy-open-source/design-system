import { BasePlacement, Placement } from '@popperjs/core'
import { DirectiveBinding } from 'vue-demi'
import type { ColorVariant } from '..'

/**
 * Parse placement from modifier
 * @param el HTMLElement
 * @param bindings Directive Binding
 */
export function parsePlacement (el: HTMLElement, { modifiers }: DirectiveBinding): Placement {
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
      result = `${result as BasePlacement}-start`
    else if (modifiers.right)
      result = `${result as BasePlacement}-end`
  } else {
    if (modifiers.right)
      result = 'right'
    else if (modifiers.left)
      result = 'left'
  }

  if (!result)
    result = 'top'

  if (modifiers.start && !result.endsWith('start'))
    result = `${result as BasePlacement}-start`
  else if (modifiers.end && !result.endsWith('end'))
    result = `${result as BasePlacement}-end`

  return result
}

export function parseAction (el: HTMLElement, { modifiers }: DirectiveBinding): string {
  const result: string[] = []

  if (modifiers.focus)
    result.push('focus')

  if (modifiers.click)
    result.push('click')

  if (modifiers.hover)
    result.push('hover')

  return result.join('-') || 'focus-hover'
}

export function parseText (el: HTMLElement, bindings: DirectiveBinding<string | boolean>): string {
  if (typeof bindings.value === 'string')
    return bindings.value

  return el.getAttribute('title') ?? el.dataset.tooltipText
}

export function parseColor (el: HTMLElement, { modifiers }: DirectiveBinding): ColorVariant {
  return modifiers.white ? 'white' : 'black'
}
