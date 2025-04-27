import type { Ref, InjectionKey } from 'vue-demi'

export type MenuSizeVariant = 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full'

interface DropdownContext {
  close: () => void,
  open: () => void,
  toggle: () => void,
  isOpen: Ref<boolean>,
}

export const DROPDOWN_CONTEXT: InjectionKey<DropdownContext> = Symbol('DROPDOWN_CONTEXT')
