import type { InjectionKey } from 'vue-demi'
import { inject } from 'vue-demi'
import { useSingleton } from '../global/use-singleton'
import type { ComponentInstance, Component } from '../global/use-singleton'
import { noop } from 'lodash-es'

export type NotifyPositionVariant = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface NotifyInstance<C extends Component = any> {
  close: () => void,
  update: (option: Partial<NotifyOption<C>>) => void,
}

export const NOTIFY_CONTEXT: InjectionKey<NotifyInstance> = Symbol('NotifyContext')

export interface NotifyOption<C extends Component = any> {
  component: C,
  props?: ComponentInstance<C>['$props'],
  position?: NotifyPositionVariant,
  duration?: number,
}

export async function showNotify<C extends Component = any> (options: NotifyOption<C>): Promise<NotifyInstance<C>> {
  const { default: Notify } = await import('./Notify.vue')
  const instance            = await useSingleton(Notify)

  return instance.show(options)
}

export function useNotifyItem () {
  return inject(NOTIFY_CONTEXT, () => {
    return {
      close : noop,
      update: noop,
    }
  }, true)
}

export default showNotify
