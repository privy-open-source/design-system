import defu from 'defu'
import { useSingleton } from '../global/use-singleton'

export type ToastTypeVariant = 'info' | 'success' | 'warning' | 'error'

export type ToastStyleVariant = 'simple' | 'filled'

export interface ToastOption {
  type?: ToastTypeVariant,
  variant?: ToastStyleVariant,
  title: string,
  text: string,
  duration?: number,
  toastClass?: string | string[],
  position?: ToastPositionVariant,
}

export type ToastPositionVariant = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

/**
 * Create reusable toast with default option
 * @param defaultOption
 * @example
 *
 * const errorToast = createToast({ variant: 'error' })
 *
 * errorToast({
 *   title  : 'Error',
 *   message: 'Something wrong, i can feel it'
 * })
 */
export function createToast (defaultOption: Partial<ToastOption>) {
  return async (option?: ToastOption) => {
    await showToast(defu(option, defaultOption))
  }
}

export default async function showToast (option: ToastOption) {
  const { default: ToastRoot } = await import('./ToastRoot.vue')
  const toast                  = await useSingleton(ToastRoot)

  await toast.add(option)
}
