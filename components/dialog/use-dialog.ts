import { useSingleton } from '../global/use-singleton'
import Dialog from './Dialog.vue'
import defu from 'defu'
import type {
  FooterAlignVariant,
  FooterButtonColorVariant,
  FooterButtonStyleVariant,
} from './DialogFooter.vue'

export interface DialogOptions {
  title: string
  text?: string
  footerAlign?: FooterAlignVariant
  cancel?: {
    text?: string
    visible?: boolean
    className?: string
    closeModal?: boolean
    color?: FooterButtonColorVariant
    variant?: FooterButtonStyleVariant
  }
  confirm?: {
    text?: string
    visible?: boolean
    className?: string
    closeModal?: boolean
    color?: FooterButtonColorVariant
    variant?: FooterButtonStyleVariant
  }
}

export interface DialogContext extends DialogOptions {
  onConfirm: () => void
  onCancel: () => void
}

export async function confirm (options: DialogOptions): Promise<boolean> {
  const modal  = await useSingleton(Dialog)
  const result = await new Promise<boolean>((resolve) => {
    modal.show(defu(
      {
        onConfirm: () => resolve(true),
        onCancel : () => resolve(false),
      },
      options,
      {
        title  : 'Confirm',
        confirm: {},
        cancel : {},
      },
    ))
  })

  return result
}

export async function alert (options: Omit<DialogOptions, 'cancel'>): Promise<void> {
  await confirm(defu(
    { cancel: { visible: false } },
    options,
    {
      title  : 'Alert',
      confirm: { text: 'Ok' },
    },
  ))
}

export default { confirm, alert }
