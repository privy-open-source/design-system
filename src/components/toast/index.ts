import {
  markRaw,
} from 'vue-demi'
import type {
  HTMLAttributes,
  Component,
} from 'vue-demi'
import type { NotifyInstance, NotifyOption } from '../notify'
import type {
  ColorVariant,
  StyleVariant as ButtonStyleVariant,
  ColorVariant as ButtonColorVariant,
  SizeVariant as ButtonSizeVariant,
} from '../button'
import type { AdditionalAttr } from '../global/types'
import type {
  PopupActionOption,
  PopupStyleVariant,
  PopupTypeVariant,
} from '../popup'
import type { RequireAtLeastOne } from 'type-fest'
import { showNotify } from '../notify'
import showPopup from '../popup'
import type Toast from './Toast.vue'
import defu from 'defu'

export interface ToastActionOption extends PopupActionOption {
  variant?: ButtonStyleVariant,
  color?: ButtonColorVariant,
  size?: ButtonSizeVariant,
}

interface Option extends Omit<NotifyOption, 'component'> {
  text?: string,
  icon?: string | Component,
  iconColor?: ColorVariant,
  toastClass?: HTMLAttributes['class'],
  toastAttrs?: AdditionalAttr,
  dismissable?: boolean,
  actions?: ToastActionOption[],
  /**
   * @deprecated `title` on toast was deprecated, use `popup()` instead.
   */
  title?: string,
  /**
  * @deprecated `type` on toast was deprecated, use `popup()` instead.
  */
  type?: PopupTypeVariant,
  /**
  * @deprecated `variant` on toast was deprecated, use `popup()` instead
  */
  variant?: PopupStyleVariant,
  loading?: boolean,
  loadingText?: string,
  loadingSpinner?: boolean,
}

export type ToastOption = RequireAtLeastOne<Option, 'title' | 'text'>

export type ToastInstance = NotifyInstance<typeof Toast>

export interface ToastProgressInstance extends ToastInstance {
  setProgress: (text: string) => void,
}

async function showToast (text: string): Promise<ToastInstance>
async function showToast (option: ToastOption): Promise<ToastInstance>
async function showToast (option: string | ToastOption): Promise<ToastInstance> {
  if (typeof option === 'string')
    return await showToast({ text: option })

  // Backward compability
  if (option.type ?? option.variant) {
    if (option.type)
      console.warn('`type` on toast was deprecated, use `popup()` instead.')

    if (option.variant)
      console.warn('`variant` on toast was deprecated, use `popup()` instead.')

    return await showPopup({
      ...option,
      popupClass: option.toastClass,
      popupAttrs: option.toastAttrs,
    }) as unknown as ToastInstance
  }

  if (option.title)
    console.warn('`title` on toast was deprecated, use `text` or `popup()` instead.')

  const { default: pToast } = await import('./Toast.vue')
  const instance            = await showNotify({
    component: markRaw(pToast),
    props    : option,
    duration : option.duration,
    position : option.position,
  })

  return instance
}

export type ToastProgressOption = Omit<ToastOption, 'title' | 'type' | 'variant' | 'duration' | 'loading' | 'dismissable' | 'actions'>

async function showToastProgress (option: string, loadingText?: string): Promise<ToastProgressInstance>
async function showToastProgress (option: ToastProgressOption): Promise<ToastProgressInstance>
async function showToastProgress (option: string | ToastProgressOption, loadingText?: string): Promise<ToastProgressInstance> {
  const opts: ToastOption = typeof option === 'string' ? { text: option, loadingText } : option as ToastOption
  const instance          = await showToast(defu({
    loading    : true,
    duration   : -1,
    dismissable: false,
  }, opts))

  function setProgress (text: string) {
    instance.update({ props: { loadingText: text } })
  }

  return Object.assign(instance, { setProgress })
}

export default Object.assign(showToast, { withProgress: showToastProgress })
