/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Placement } from '@floating-ui/dom'
import type { Directive } from 'vue-demi'
import { useSingleton } from '../global/use-singleton'
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

async function useTooltip () {
  const { default: TooltipContainer } = await import('./TooltipContainer.vue')
  const tooltip                       = await useSingleton(TooltipContainer)

  return tooltip
}

export const pTooltip: Directive<HTMLElement, string | boolean> = {
  async mounted (el, bindings) {
    const tooltip   = await useTooltip()
    const action    = parseAction(el, bindings)
    const color     = parseColor(el, bindings)
    const text      = parseText(el, bindings)
    const placement = parsePlacement(el, bindings)
    const enable    = bindings.value !== false && !!text

    const id = tooltip.add({
      target   : el,
      placement: placement,
      text     : text,
      color    : color,
    })

    el.dataset.tooltipId     = id
    el.dataset.tooltipAction = action
    el.dataset.tooltipText   = text
    el.dataset.tooltipEnable = enable ? 'true' : 'false'

    el.removeAttribute('title') // remove attribute title, we don't want native-browser's tooltip to shown
    el.addEventListener('click', handleClick)
    el.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    el.addEventListener('focus', handleFocus, { passive: true })
    el.addEventListener('blur', handleBlur, { passive: true })
  },

  async updated (el, bindings) {
    const tooltip   = await useTooltip()
    const id        = el.dataset.tooltipId
    const action    = parseAction(el, bindings)
    const color     = parseColor(el, bindings)
    const text      = parseText(el, bindings)
    const placement = parsePlacement(el, bindings)
    const enable    = bindings.value !== false && !!text

    el.dataset.tooltipAction = action
    el.dataset.tooltipText   = text
    el.dataset.tooltipEnable = enable ? 'true' : 'false'

    tooltip.update(id, {
      target   : el,
      placement: placement,
      text     : text,
      color    : color,
    })

    if (enable && bindings.value === true)
      tooltip.show(id)

    if (!enable)
      tooltip.hide(id)

    el.removeAttribute('title')
  },

  async unmounted (el, bindings) {
    const { default: TooltipContainer } = await import('./TooltipContainer.vue')
    const tooltip                       = await useSingleton(TooltipContainer)
    const id                            = el.dataset.tooltipId
    const text                          = parseText(el, bindings)

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

export const vPTooltip = pTooltip

function getTooltipId (selector: HTMLElement | string) {
  const targets = selector instanceof HTMLElement
    ? [selector]
    : [...document.querySelectorAll(selector)]

  return targets
    .map((target) => (target as HTMLElement)?.dataset.tooltipId)
    .filter(Boolean)
}

export async function showTooltip (selector: string | HTMLElement) {
  const ids     = getTooltipId(selector)
  const tooltip = await useTooltip()

  for (const id of ids)
    tooltip.show(id)
}

export async function hideTooltip (selector: string | HTMLElement) {
  const ids     = getTooltipId(selector)
  const tooltip = await useTooltip()

  for (const id of ids)
    tooltip.hide(id)
}

export async function toggleTooltip (selector: string | HTMLElement) {
  const ids     = getTooltipId(selector)
  const tooltip = await useTooltip()

  for (const id of ids)
    tooltip.toggle(id)
}
