import {
  computed, type ComputedRef, type MaybeRefOrGetter, toValue, type InjectionKey, type Ref,
} from 'vue'

export interface AccordionItem {
  title: string,
  content: string,
  disabled?: boolean,
}

export const ACCORDION_CONTEXT: InjectionKey<{
  openItem: Readonly<Ref<string | undefined>>,
  multiple: boolean,
  noCaret: boolean,
  setOpenItem: (id: string) => void,
}> = Symbol('accordion')

export function defineAccordion (items: AccordionItem[]): AccordionItem[] {
  return items
}

const getId = (suffix = ''): string => `${suffix}__${Math.random().toString().slice(2, 8)}`

export const generateId = (id?: MaybeRefOrGetter<string | undefined>, suffix?: string): ComputedRef<string> =>
  computed(() => toValue(id) ?? getId(suffix))
