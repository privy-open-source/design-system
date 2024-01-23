import { useSingleton } from '../global/use-singleton'
import defu from 'defu'
import type { SizeVariant } from '../modal'
import type {
  SizeVariant as InputSizeVariant,
  StyleVariant as FooterButtonStyleVariant,
  ColorVariant as FooterButtonColorVariant,
} from '../button'
import type { VNode } from 'vue-demi'
import {
  ref,
  h,
  mergeProps,
} from 'vue-demi'
import pInput from '../input/Input.vue'
import pFormGroup from '../form-group/FormGroup.vue'
import type { AcceptVariant } from '../input'
import type { AdditionalAttr } from '../global/types'

export type FooterAlignVariant = 'start' | 'end'

interface DialogButton {
  text?: string,
  visible?: boolean,
  className?: string,
  closeModal?: boolean,
  color?: FooterButtonColorVariant,
  variant?: FooterButtonStyleVariant,
  attrs?: AdditionalAttr,
}

export interface DialogOptions {
  title: string,
  text?: string,
  size?: SizeVariant,
  centered?: boolean,
  dismissable?: boolean,
  noCloseOnBackdrop?: boolean,
  footerAlign?: FooterAlignVariant,
  cancel?: DialogButton,
  confirm?: DialogButton,
  attrs?: AdditionalAttr,
}

export type DialogConfirmOption = DialogOptions

export type DialogAlertOption = Omit<DialogOptions, 'cancel'>

export interface DialogPromptOption extends DialogOptions {
  value?: string,
  input?: {
    type?: string,
    placeholder?: string,
    size?: InputSizeVariant,
    clearable?: boolean,
    accept?: AcceptVariant,
    attrs?: AdditionalAttr,
  },
}

export interface DialogContext extends DialogOptions {
  onConfirm: () => void,
  onCancel: () => void,
  content?: () => VNode,
}

export async function confirm (options: DialogConfirmOption): Promise<boolean> {
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

export async function alert (options: DialogConfirmOption): Promise<void> {
  await confirm(defu(
    { cancel: { visible: false } },
    options,
    {
      title  : 'Alert',
      confirm: { text: 'Ok' },
    },
  ))
}

export async function prompt (options: DialogPromptOption): Promise<string> {
  const { default: Dialog } = await import('./Dialog.vue')
  const model               = ref(options.value)
  const input               = ref<InstanceType<typeof pInput>>()
  const modal               = await useSingleton(Dialog)
  const result              = await new Promise<string>((resolve) => {
    modal.show(defu(
      {
        content: () => {
          return h('form', {
            onSubmit (event) {
              event.preventDefault()

              resolve(model.value)
            },
          }, [
            h(pFormGroup, { label: options.text }, () => [
              h(pInput, mergeProps(options.input?.attrs, {
                'ref'                : input,
                'type'               : options.input?.type,
                'placeholder'        : options.input?.placeholder,
                'size'               : options.input?.size,
                'clearable'          : options.input?.clearable,
                'accept'             : options.input?.accept,
                'modelValue'         : model.value,
                'onUpdate:modelValue': (value: string) => {
                  model.value = value
                },
              })),
            ]),
          ])
        },
        onConfirm: () => resolve(model.value),
        onCancel : () => resolve(''),
      },
      options,
      {
        title   : 'Question',
        confirm : { text: 'Submit' },
        cancel  : {},
        centered: true,
      },
    )).then(() => {
      input.value?.input.focus()
    })
  })

  return result
}
