import { useSingleton } from '../global/use-singleton'
import defu from 'defu'
import type {
  FooterAlignVariant,
  FooterButtonColorVariant,
  FooterButtonStyleVariant,
} from './DialogFooter.vue'
import type { SizeVariant } from '../modal/Modal.vue'

interface DialogButton {
  text?: string,
  visible?: boolean,
  className?: string,
  closeModal?: boolean,
  color?: FooterButtonColorVariant,
  variant?: FooterButtonStyleVariant,
}
export interface DialogOptions {
  title: string,
  text?: string,
  size?: SizeVariant,
  centered?: boolean,
  footerAlign?: FooterAlignVariant,
  cancel?: DialogButton,
  confirm?: DialogButton,
}

export interface DialogContext extends DialogOptions {
  onConfirm: () => void,
  onCancel: () => void,
}

export async function confirm (options: DialogOptions): Promise<boolean> {
  const { default: Dialog } = await import('./Dialog.vue')
  const modal               = await useSingleton(Dialog)
  const result              = await new Promise<boolean>((resolve) => {
    modal.show(defu(
      {
        onConfirm: () => resolve(true),
        onCancel : () => resolve(false),
      },
      options,
      {
        title   : 'Confirm',
        confirm : {},
        cancel  : {},
        centered: true,
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
