import { Ref, InjectionKey } from 'vue-demi'

export type MenuSizeVariant = 'sm' | 'md' | 'lg' | 'xl'

interface DropdownContext {
  close: () => void,
  open: () => void,
  toggle: () => void,
  isOpen: Ref<boolean>,
}

export const DROPDOWN_CONTEXT: InjectionKey<DropdownContext> = Symbol('DROPDOWN_CONTEXT')
