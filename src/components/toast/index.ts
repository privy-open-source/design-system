import type { Component } from 'vue-demi'
import { useSingleton } from '../global/use-singleton'
import type { ColorVariant, StyleVariant } from '../button'

export type ToastStyleVariant = 'simple' | 'filled'

export interface ToastOption {
  text?: string,
  icon?: string | Component,
  duration?: number,
  toastClass?: string | string[],
  position?: ToastPositionVariant,
  iconColor?: ColorVariant,
  dismissText?: string,
  dismissVariant?: StyleVariant,
  loading?: boolean,
}

export type ToastPositionVariant = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export default async function showToast (option: ToastOption) {
  const { default: ToastRoot } = await import('./ToastRoot.vue')
  const toast                  = await useSingleton(ToastRoot)

  await toast.add(option)
}
