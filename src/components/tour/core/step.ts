import { AbstractTour, TourDirection } from './base'
import type {
  Tour,
  TourOptions,
} from './tour'

type Merge<A, B> = Omit<A, keyof B> & B
type BaseOptions = Partial<Omit<TourOptions, 'onFinished'>>

export type OnCleanup = (cleanupFn: () => unknown) => unknown

export abstract class AbstractStep<Option> extends AbstractTour<Merge<BaseOptions, Option>> {
  declare protected parent?: Tour

  protected cleanFns: Array<() => unknown> = []

  protected async dispose () {
    return await Promise.allSettled(this.cleanFns.map((clean) => clean()))
  }

  /**
   * Run function before unmounted
   * @param cleanFn clean function
   */
  protected onCleanup (cleanFn: () => unknown) {
    this.cleanFns.push(cleanFn)
  }

  /**
   * Start this step
   */
  public async start () {
    this.attach(this.parent)

    await this.run()
  }

  /**
   * Stop this step
   */
  public async stop () {
    await this.dispose()

    this.detach(this.parent)
  }

  /**
   * Trigger next to parent
   */
  public async next () {
    await this.parent.next()
  }

  /**
   * Trigger prev to parent
   */
  public async prev () {
    await this.parent.prev()
  }

  /**
   * Trigger next or prev following the direction
   */
  public async ahead () {
    return await (this.direction === TourDirection.BACKWARD
      ? this.prev()
      : this.next())
  }

  protected abstract run (): void | Promise<void>
}
