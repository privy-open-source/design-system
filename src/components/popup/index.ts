import type { Component } from 'vue-demi'
import { useSingleton } from '../global/use-singleton'
import type { ColorVariant } from '../button'

export type PopupTypeVariant = 'info' | 'success' | 'warning' | 'error'

export type PopupStyleVariant = 'simple' | 'filled'

export interface PopupOption {
  type?: PopupTypeVariant,
  variant?: PopupStyleVariant,
  title: string,
  text?: string,
  icon?: string | Component,
  duration?: number,
  popupClass?: string | string[],
  position?: PopupPositionVariant,
  iconColor?: ColorVariant,
}

export type PopupPositionVariant = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export default async function showPopup (option: PopupOption) {
  const { default: PopupRoot } = await import('./PopupRoot.vue')
  const popup                  = await useSingleton(PopupRoot)

  await popup.add(option)
}
