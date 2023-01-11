import { InjectionKey, Ref } from 'vue-demi'
import { StyleVariant } from '../nav'

export type ToggleableVariant = 'sm' | 'md' | 'lg'

export interface NavbarSettings {
  variant: Ref<StyleVariant>,
  toggleable?: Ref<string | undefined>,
  condensed?: Ref<boolean>,
}

export const NAVBAR_SETTINGS: InjectionKey<NavbarSettings> = Symbol('NavbarSettings')
