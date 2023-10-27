import type { InjectionKey } from 'vue-demi'
import type { StyleVariant, AlignVariant } from '../nav'

export type TypeVariant = 'wide' | 'narrow'

export interface SidebarSettings {
  variant: StyleVariant,
  align: AlignVariant,
  type: TypeVariant,
}

export const SIDEBAR_SETTINGS: InjectionKey<SidebarSettings> = Symbol('SidebarSettings')
