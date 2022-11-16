import { AbstractTour } from './base'
import {
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

  public async start () {
    this.attach(this.parent)

    await this.run()
  }

  public async stop () {
    await this.dispose()

    this.detach(this.parent)
  }

  public async next () {
    await this.parent.next()
  }

  public async prev () {
    await this.parent.prev()
  }

  protected abstract run (): void | Promise<void>
}
