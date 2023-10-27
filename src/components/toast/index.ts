import type { Component } from 'vue-demi'
import { useSingleton } from '../global/use-singleton'
import { ColorVariant } from '../button'

export type ToastTypeVariant = 'info' | 'success' | 'warning' | 'error'

export type ToastStyleVariant = 'simple' | 'filled'

export interface ToastOption {
  type?: ToastTypeVariant,
  variant?: ToastStyleVariant,
  title: string,
  text?: string,
  icon?: string | Component,
  duration?: number,
  toastClass?: string | string[],
  position?: ToastPositionVariant,
  iconColor?: ColorVariant,
}

export type ToastPositionVariant = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export default async function showToast (option: ToastOption) {
  const { default: ToastRoot } = await import('./ToastRoot.vue')
  const toast                  = await useSingleton(ToastRoot)

  await toast.add(option)
}
