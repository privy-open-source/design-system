import type { InjectionKey, Ref } from 'vue-demi'

export type TypeVariant = 'image' | 'alias'

export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarGroupSetting {
  size?: Ref<SizeVariant>,
}

export const AVATARGROUP_SETTING: InjectionKey<AvatarGroupSetting> = Symbol('AvatarGroupSetting')
