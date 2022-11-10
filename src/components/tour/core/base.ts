import defu from 'defu'
import { runAllHooks } from '../../steps/utils/hook'

export type TourActionHook = (to: AbstractTour, from: AbstractTour) => boolean | Promise<boolean>

export enum TourDirection {
  FORWARD = 1,
  BACKWARD = -1,
}

export interface BaseTourOptions {
  /**
   * Uniq identifier, can be string or symbol
   * use for edit and remove
   */
  name?: string | symbol,
  /**
   * on-before-prev hook
   */
  onBeforePrev?: TourActionHook,
  /**
    * on-before-next hook
    */
  onBeforeNext?: TourActionHook,
}

export abstract class AbstractTour<Options extends BaseTourOptions = any> {
  public name?: string | symbol

  /**
   * Step direction, 1 for forward (next), -1 for backward (prev)
   */
  protected direction: TourDirection

  protected parent?: AbstractTour
  protected options: Options

  protected onNextHooks: TourActionHook[]
  protected onPrevHooks: TourActionHook[]

  protected runOnPrevHooks: TourActionHook
  protected runOnNextHooks: TourActionHook

  constructor (options?: Options) {
    this.direction   = TourDirection.FORWARD
    this.name        = options?.name ?? Symbol('TourID')
    this.options     = options
    this.onPrevHooks = []
    this.onNextHooks = []

    if (typeof options?.onBeforeNext === 'function')
      this.onPrevHooks.unshift(options.onBeforeNext)

    if (typeof options?.onBeforeNext === 'function')
      this.onNextHooks.unshift(options.onBeforeNext)

    this.runOnPrevHooks = async (...args: Parameters<TourActionHook>) => {
      return await runAllHooks(this.onPrevHooks, ...args)
    }

    this.runOnNextHooks = async (...args: Parameters<TourActionHook>) => {
      return await runAllHooks(this.onNextHooks, ...args)
    }
  }

  public setParent (parent: AbstractTour<any>) {
    this.parent = parent

    return this
  }

  public setOptions (options: Options) {
    this.options = options

    return this
  }

  public getOptions (): Options {
    return defu(this.options, this.parent?.getOptions()) as Options
  }

  public setDirection (direction: TourDirection) {
    this.direction = direction

    return this
  }

  public attach (parent: AbstractTour) {
    parent.onPrevHooks.unshift(this.runOnPrevHooks)
    parent.onNextHooks.unshift(this.runOnNextHooks)

    return this
  }

  public detach (parent: AbstractTour) {
    const pi = parent.onPrevHooks.indexOf(this.runOnPrevHooks)
    const ni = parent.onNextHooks.indexOf(this.runOnNextHooks)

    if (pi > -1)
      parent.onPrevHooks.splice(pi, 1)

    if (ni > -1)
      parent.onNextHooks.splice(ni, 1)

    return this
  }

  public abstract start (): void | Promise<void>

  public abstract stop (): void | Promise<void>
}
