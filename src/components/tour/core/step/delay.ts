import { delay } from 'nanodelay'
import { TourDirection } from '../base'
import { AbstractStep } from '../step'

interface Options {
  duration: number,
}

export default class StepDelay extends AbstractStep<Options> {
  protected async run () {
    const options = this.getOptions()

    await delay(options.duration)
    await (this.direction === TourDirection.BACKWARD ? this.prev() : this.next())
  }
}
