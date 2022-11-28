import userEvent from '@testing-library/user-event'
import { AbstractStep } from '../step'
import { waitElement } from '../../utils/wait-element'

type UserEvent = ReturnType<typeof userEvent['setup']>
type ExtractParams<F> = F extends (T: Element, ...args: infer P) => Promise<void> ? P : unknown[]

export type EventType = 'click' | 'dblClick' | 'tripleClick' | 'type' | 'hover' | 'unhover' | 'clear'

export type ParamsOf<E extends EventType> = ExtractParams<UserEvent[E]>

export interface ActionOptions<E extends EventType> {
  target: string,
  action: E,
  params: ParamsOf<E>,
}

export default class StepAction<E extends EventType> extends AbstractStep<ActionOptions<E>> {
  protected async run () {
    const options = this.getOptions()
    const target  = await waitElement(options.target, options.waitTimeout)
    const user    = userEvent.setup({ document: document })
    const action  = options.action
    const params  = options.params ?? []

    await user[action].apply(undefined, [target, ...params])
    await this.ahead()
  }
}
