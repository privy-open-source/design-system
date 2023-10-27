import type {
  InjectionKey,
  ShallowRef,
  Slots,
} from 'vue-demi'

export interface DropdownNode {
  _level: number, // Just id to trigger transition
  prev?: DropdownNode,
  slots: Slots,
}

export interface DropdownContext {
  tree: ShallowRef<DropdownNode>,
  next: () => void,
  back: () => void,
}

export const DROPDOWN_TREE: InjectionKey<DropdownContext> = Symbol('DropdownTree')
