import { AbstractStep } from '../core/step'
import userEvent from '@testing-library/user-event'

export const EventAction = [
  'click',
  'dblClick',
  'tripleClick',
  'type',
  'hover',
  'unhover',
] as const

type UserEvent = ReturnType<typeof userEvent['setup']>
type EventType = typeof EventAction[number]
type ExtractParams<F> = F extends (T: Element, ...args: infer P) => Promise<void> ? P : unknown[]
type ParamsOf<E extends EventType> = ExtractParams<UserEvent[E]>

export interface Options<E extends EventType> {
  target: string,
  action: E,
  params: ParamsOf<E>,
}

export default class StepUserEvent<E extends EventType> extends AbstractStep<Options<E>> {
  protected async mount () {
    const options = this.getOptions()
    const target  = await this.waitElement(options.target, options.waitTimeout)
    const user    = userEvent.setup({ document: document })
    const action  = options.action
    const args    = options.params ?? []

    await user[action].apply(undefined, [target, ...args])
    await this.next()
  }

  protected async unmount () {
    // Do nothing
  }
}
