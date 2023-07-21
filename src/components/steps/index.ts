import { tryOnUnmounted } from '@vueuse/core'
import { runAllHooks } from './utils/hook'
import { noop } from 'lodash-es'
import {
  ComputedRef,
  inject,
  InjectionKey,
  ref,
  Ref,
} from 'vue-demi'

export type TravelHook = (to: number, from: number) => boolean | Promise<boolean>

export type FinishedHook = () => void | Promise<void>

export type DirectionVariant = 'horizontal' | 'vertical'

export type AnimationVariant = 'slide' | 'slide-full'

export interface StepContext {
  next: () => void,
  prev: () => void,
  toStep: (step: number) => void,

  total: Ref<number>,
  step: Ref<number>,
  canPrev: ComputedRef<boolean>,
  canNext: ComputedRef<boolean>,

  onPrevHooks: Ref<TravelHook[]>,
  onNextHooks: Ref<TravelHook[]>,
}

export const STEPS_CONTEXT: InjectionKey<StepContext> = Symbol('STEPS_CONTEXT')

export function useStep () {
  const context = inject(STEPS_CONTEXT, () => {
    console.warn('<p-step> must be placed inside <p-steps>')

    return {
      next       : noop,
      prev       : noop,
      toStep     : noop,
      total      : ref(1),
      step       : ref(1),
      canPrev    : ref(false),
      canNext    : ref(false),
      onPrevHooks: ref([]),
      onNextHooks: ref([]),
    }
  }, true)

  const localPrevHooks = ref([])
  const localNextHooks = ref([])

  function onBeforePrev (hook: TravelHook) {
    localPrevHooks.value.unshift(hook)
  }

  function onBeforeNext (hook: TravelHook) {
    localNextHooks.value.unshift(hook)
  }

  const onPrevHookTrap: TravelHook = async (...args) => {
    return await runAllHooks(localPrevHooks.value, ...args)
  }

  const onNextHookTrap: TravelHook = async (...args) => {
    return await runAllHooks(localNextHooks.value, ...args)
  }

  context.onPrevHooks.value.unshift(onPrevHookTrap)
  context.onNextHooks.value.unshift(onNextHookTrap)

  tryOnUnmounted(() => {
    const pi = context.onPrevHooks.value.indexOf(onPrevHookTrap)
    const ni = context.onNextHooks.value.indexOf(onNextHookTrap)

    if (pi > -1)
      context.onPrevHooks.value.splice(pi, 1)

    if (ni > -1)
      context.onNextHooks.value.splice(ni, 1)
  })

  return {
    ...context,
    onBeforePrev,
    onBeforeNext,
  }
}
