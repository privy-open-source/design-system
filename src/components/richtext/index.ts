import type { Editor } from '@tiptap/vue-3'
import {
  inject,
  type InjectionKey,
  type ShallowRef,
} from 'vue-demi'

export const RICHTEXT_CONTEXT: InjectionKey<{ editor: ShallowRef<Editor> }> = Symbol('Richtext')

export type ControlVariant = 'simple' | 'advanced'

export function useRichtextEditor () {
  return inject(RICHTEXT_CONTEXT).editor
}
