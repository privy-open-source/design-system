import defu from 'defu'
import { Hook } from '../../steps/utils/hook'

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

export abstract class AbstractTour<Options extends BaseTourOptions = BaseTourOptions> {
  public name?: string | symbol

  /**
   * Step direction, 1 for forward (next), -1 for backward (prev)
   */
  protected direction: TourDirection

  protected parent?: AbstractTour
  protected options: Options

  protected onNextHooks: Hook<TourActionHook>
  protected onPrevHooks: Hook<TourActionHook>

  protected runOnPrevHooks: TourActionHook
  protected runOnNextHooks: TourActionHook

  constructor (options?: Options) {
    this.direction   = TourDirection.FORWARD
    this.name        = options?.name ?? Symbol('TourID')
    this.options     = options
    this.onPrevHooks = new Hook()
    this.onNextHooks = new Hook()

    if (typeof options?.onBeforePrev === 'function')
      this.onPrevHooks.add(options.onBeforePrev)

    if (typeof options?.onBeforeNext === 'function')
      this.onNextHooks.add(options.onBeforeNext)

    this.runOnPrevHooks = async (...args) => await this.onPrevHooks.run(...args)
    this.runOnNextHooks = async (...args) => await this.onNextHooks.run(...args)
  }

  public setParent (parent: AbstractTour) {
    this.parent = parent

    return this
  }

  /**
   * Get options with parent options as fallback
   */
  public getOptions (): Options {
    return defu(this.options, this.parent?.getOptions()) as Options
  }

  /**
   * Set tour direction
   * @param direction 1 for forward (next) and -1 for backward (prev)
   */
  public setDirection (direction: TourDirection) {
    this.direction = direction

    return this
  }

  /**
   * Attach to parent
   * @param parent Parent Instance
   */
  public attach (parent: AbstractTour) {
    parent.onPrevHooks.add(this.runOnPrevHooks)
    parent.onNextHooks.add(this.runOnNextHooks)

    return this
  }

  /**
   * Deattach from parent
   * @param parent Parent Instance
   */
  public detach (parent: AbstractTour) {
    parent.onPrevHooks.remove(this.runOnPrevHooks)
    parent.onNextHooks.remove(this.runOnNextHooks)

    return this
  }

  public abstract start (): void | Promise<void>

  public abstract stop (): void | Promise<void>

  public abstract next (): void | Promise<void>

  public abstract prev (): void | Promise<void>
}
