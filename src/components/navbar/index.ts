import type { InjectionKey, Ref } from 'vue-demi'
import type { StyleVariant } from '../nav'

export type ToggleableVariant = 'sm' | 'md' | 'lg' | 'all'

export interface NavbarSettings {
  variant: Ref<StyleVariant>,
  toggleable?: Ref<string | undefined>,
  condensed?: Ref<boolean>,
}

export const NAVBAR_SETTINGS: InjectionKey<NavbarSettings> = Symbol('NavbarSettings')
