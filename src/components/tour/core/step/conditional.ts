import { MaybeRef } from '@vueuse/shared'
import { unref } from 'vue-demi'
import { AbstractStep } from '../step'
import { Tour } from '../tour'

export interface ConditionalOptions {
  condition: MaybeRef<boolean | (() => boolean | Promise<boolean>)>,
  tour: Tour,
}

export enum ConditionalType {
  IF = 1,
  ELSE_IF = 2,
  ELSE = 3,
}

interface Routine extends ConditionalOptions {
  type: ConditionalType,
}

export default class StepCondition extends AbstractStep<ConditionalOptions> {
  protected routines: Routine[]

  constructor (options: ConditionalOptions) {
    super(options)

    this.routines = [
      {
        type     : ConditionalType.IF,
        condition: options.condition,
        tour     : options.tour,
      },
    ]
  }

  public canChain () {
    return this.routines.at(-1).type !== ConditionalType.ELSE
  }

  public chain (routine: Routine) {
    this.routines.push(routine)

    return this
  }

  public getTotalChild () {
    return Math.max(...this.routines.map((routine) => routine.tour.getTotalChild()))
  }

  public getRoutines () {
    return this.routines
  }

  protected async run () {
    let result = false

    for (const routine of this.routines) {
      const condition = unref(routine.condition)

      try {
        result = typeof condition === 'function'
          ? await condition()
          : condition
      } catch (error) {
        if (import.meta.env.DEV)
          console.warn(error)

        result = false
      }

      if (result) {
        const tour = routine.tour

        await tour
          .setParent(this.parent)
          .setDirection(this.direction)
          .start()

        this.onCleanup(async () => {
          await tour.stop()
        })

        break
      }
    }

    if (!result)
      await this.ahead()
  }
}
