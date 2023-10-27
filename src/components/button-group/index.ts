import type { InjectionKey, Ref } from 'vue-demi'
import type { SizeVariant } from '../button'

export interface ButtonGroupSetting {
  size?: Ref<SizeVariant>,
}

export const BUTTONGROUP_SETTING: InjectionKey<ButtonGroupSetting> = Symbol('ButtonGroupSetting')
