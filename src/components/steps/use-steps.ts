import {
  ComputedRef,
  inject,
  InjectionKey,
} from 'vue-demi'

export interface StepContext {
  next: () => void,
  prev: () => void,
  toStep: (step: number) => void,

  canPrev: ComputedRef<boolean>,
  canNext: ComputedRef<boolean>,
}

export const STEPS_CONTEXT: InjectionKey<StepContext> = Symbol('STEPS_CONTEXT')

export function useStep () {
  return inject(STEPS_CONTEXT)
}
