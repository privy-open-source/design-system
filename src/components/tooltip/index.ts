/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Placement } from '@popperjs/core'
import { Directive } from 'vue-demi'
import { useSingleton } from '../global/use-singleton'
import TooltipContainer from './TooltipContainer.vue'
import createHandler from './utils/create-handler'
import {
  parsePlacement,
  parseAction,
  parseText,
  parseColor,
} from './utils/parse-bindings'

export type ColorVariant = 'black' | 'white'

export interface TooltipOptions {
  text: string,
  color: ColorVariant,
  placement: Placement,
  target: HTMLElement,
}

export interface TooltipItem extends TooltipOptions {
  isShow: boolean,
}

const handleClick      = createHandler('click', 'toggle', true)
const handleMouseEnter = createHandler('hover', 'show')
const handleMouseLeave = createHandler('hover', 'hide')
const handleFocus      = createHandler('focus', 'show')
const handleBlur       = createHandler('focus', 'hide')

export const PTooltip: Directive<HTMLElement, string | boolean> = {
  async mounted (el, bindings) {
    const tooltip   = await useSingleton(TooltipContainer)
    const action    = parseAction(el, bindings)
    const color     = parseColor(el, bindings)
    const text      = parseText(el, bindings)
    const placement = parsePlacement(el, bindings)

    const id = tooltip.add({
      target   : el,
      placement: placement,
      text     : text,
      color    : color,
    })

    el.dataset.tooltipId     = id
    el.dataset.tooltipAction = action
    el.dataset.tooltipText   = text
    el.dataset.tooltipEnable = (bindings.value !== false && text) ? 'true' : 'false'

    el.removeAttribute('title')
    el.addEventListener('click', handleClick)
    el.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    el.addEventListener('focus', handleFocus, { passive: true })
    el.addEventListener('blur', handleBlur, { passive: true })
  },

  async updated (el, bindings) {
    const tooltip   = await useSingleton(TooltipContainer)
    const id        = el.dataset.tooltipId
    const action    = parseAction(el, bindings)
    const color     = parseColor(el, bindings)
    const text      = parseText(el, bindings)
    const placement = parsePlacement(el, bindings)

    el.dataset.tooltipAction = action
    el.dataset.tooltipText   = text
    el.dataset.tooltipEnable = (bindings.value !== false && text) ? 'true' : 'false'

    tooltip.update(id, {
      target   : el,
      placement: placement,
      text     : text,
      color    : color,
    })

    el.removeAttribute('title')
  },

  async beforeUnmount (el, bindings) {
    const tooltip = await useSingleton(TooltipContainer)
    const id      = el.dataset.tooltipId
    const text    = parseText(el, bindings)

    tooltip.remove(id)

    el.removeEventListener('click', handleClick)
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
    el.removeEventListener('focus', handleFocus)
    el.removeEventListener('blur', handleBlur)
    el.setAttribute('title', text)

    delete el.dataset.tooltipId
    delete el.dataset.tooltipAction
    delete el.dataset.tooltipText
    delete el.dataset.tooltipEnable
  },
}

export const vPTooltip = PTooltip
