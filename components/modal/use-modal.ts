import { useSingleton } from '../global/use-singleton'
import ModalContainer from './ModalContainer.vue'

export type ModalFooterAlignVariant = 'start' | 'end'
export type ModalButtonStyleVariant = 'solid' | 'outline' | 'ghost' | 'link'
export type ModalButtonColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'gold'

export interface ModalOptions {
  title: string
  text?: string
  footerAlign?: ModalFooterAlignVariant
  cancel: {
    text?: string
    visible?: boolean
    className?: string
    closeModal?: boolean
    color?: ModalButtonColorVariant
    variant?: ModalButtonStyleVariant
  }
  confirm: {
    text?: string
    visible?: boolean
    className?: string
    closeModal?: boolean
    color?: ModalButtonColorVariant
    variant?: ModalButtonStyleVariant
  }
}

export default async function showModal (options: ModalOptions) {
  // eslint-disable-next-line unicorn/no-await-expression-member
  (await useSingleton(ModalContainer)).show(options)
}
