import {
  ComputedRef,
  inject,
  InjectionKey,
  Ref,
} from 'vue-demi'

export interface StepContext {
  next: () => void,
  prev: () => void,
  toStep: (step: number) => void,

  step: Ref<number>,
  canPrev: ComputedRef<boolean>,
  canNext: ComputedRef<boolean>,
}

export type TravelHook = (to: number, from: number) => boolean | Promise<boolean>

export type FinishedHook = () => void | Promise<void>

export const STEPS_CONTEXT: InjectionKey<StepContext> = Symbol('STEPS_CONTEXT')

export function useStep () {
  return inject(STEPS_CONTEXT)
}

export async function runHook (hook: TravelHook, ...args: Parameters<TravelHook>): Promise<boolean> {
  try {
    return await hook.call(this, ...args)
  } catch {
    return false
  }
}
