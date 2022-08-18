import { MaybeRef } from '@vueuse/core'
import {
  getCurrentInstance,
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
  Slots,
  ComponentInternalInstance,
  onBeforeUnmount,
} from 'vue-demi'

export interface TabContext {
  title: MaybeRef<string>,
  disabled: MaybeRef<boolean>,
  slots: Slots,
  instance: ComponentInternalInstance,
}

export const TABS_CONTEXT: InjectionKey<Ref<TabContext[]>> = Symbol('TABS_CONTEXT')

export const TABS_POINTER: InjectionKey<Ref<number>> = Symbol('TABS_POINTER')

export function initTabs () {
  const tabs: Ref<TabContext[]> = ref([])

  provide(TABS_CONTEXT, tabs)

  return tabs
}

export function addTab (context: Omit<TabContext, 'instance'>) {
  const tabs  = inject(TABS_CONTEXT)
  const vm    = getCurrentInstance()
  const index = tabs.value.push({ ...context, instance: vm }) - 1

  onBeforeUnmount(() => {
    if (tabs.value)
      tabs.value.splice(index, 1)
  })

  return index
}
