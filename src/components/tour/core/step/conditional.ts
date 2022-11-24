import { MaybeRef } from '@vueuse/shared'
import { unref } from 'vue-demi'
import { TourDirection } from '../base'
import { AbstractStep } from '../step'
import { Tour } from '../tour'

export interface ConditionalOptions {
  condition: MaybeRef<boolean | (() => boolean | Promise<boolean>)>,
  tour: Tour,
}

export default class StepCondition extends AbstractStep<ConditionalOptions> {
  protected async checkCondition () {
    try {
      const options   = this.getOptions()
      const condition = unref(options.condition)

      return typeof condition === 'function'
        ? await condition()
        : condition
    } catch (error) {
      if (import.meta.env.DEV)
        console.warn(error)

      return false
    }
  }

  public getTotalChild () {
    return this.getOptions().tour.getTotalChild()
  }

  protected async run () {
    if (await this.checkCondition()) {
      const tour  = this.getOptions().tour
      const index = this.direction === TourDirection.BACKWARD
        ? tour.getSteps().length - 1
        : 0

      await tour.setParent(this.parent).start(index, this.direction)

      this.onCleanup(async () => {
        await tour.stop()
      })
    } else
      await this.ahead()
  }
}
