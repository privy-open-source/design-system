import { delay } from 'nanodelay'
import { AbstractStep } from '../core/step'

interface Options {
  duration: number,
}

export default class StepDelay extends AbstractStep<Options> {
  protected async run () {
    const options = this.getOptions()

    await delay(options.duration)
    await this.next()
  }
}
