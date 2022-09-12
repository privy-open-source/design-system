import { useSingleton } from '../global/use-singleton'
import ToastContainer from './ToastContainer.vue'

export type ToastTypeVariant = 'info' | 'success' | 'warn' | 'error'

export type ToastStyleVariant = 'simple' | 'filled'

export interface ToastOption {
  type?: ToastTypeVariant,
  variant?: ToastStyleVariant,
  title: string,
  text: string,
  duration?: number,
  toastClass?: string | string[],
}

export default async function showToast (option: ToastOption) {
  // eslint-disable-next-line unicorn/no-await-expression-member
  (await useSingleton(ToastContainer)).add(option)
}
