import { InjectionKey, Ref } from 'vue-demi'
import { SizeVariant } from '../button'

export interface InputGroupSetting {
  size?: Ref<SizeVariant>,
}

export const INPUTGROUP_SETTING: InjectionKey<InputGroupSetting> = Symbol('InputGroupSetting')
