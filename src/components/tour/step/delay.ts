import { delay } from 'nanodelay'
import { AbstractStep } from '../core/step'

export default class StepDelay extends AbstractStep<{}> {
  protected async mount () {
    await delay(300)
    await this.next()
  }

  protected async unmount () {
    // Do Nothing
  }
}
