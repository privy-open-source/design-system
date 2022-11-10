import { focus, isVisible } from '../utils/dom'
import { AbstractTour } from './base'
import {
  Tour,
  TourOptions,
} from './tour'

type Merge<A, B> = Omit<A, keyof B> & B
type BaseOptions = Partial<Omit<TourOptions, 'onFinished'>>

export type OnCleanup = (cleanupFn: () => unknown) => unknown

export abstract class AbstractStep<Opt = {}> extends AbstractTour<Merge<BaseOptions, Opt>> {
  protected parent?: Tour
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

  /**
   * Get element and throw error if target not visible
   * @param selector query selector
   */
  protected async getElement<Element extends HTMLElement> (selector: string): Promise<Element> {
    const target = document.querySelector<Element>(selector)

    if (target) {
      await focus(target)

      if (!(await isVisible(target)))
        throw new Error(`Target: "${selector}" not visible`)
    }

    return target
  }

  /**
   * Wait element appear
   * @param selector query selector
   * @param timeout wait timeout in millisecond
   */
  public async waitElement<Element extends HTMLElement>(selector: string, timeout = 30_000): Promise<Element> {
    return await new Promise((resolve, reject) => {
      let timer: ReturnType<typeof setTimeout>

      const mutation = new MutationObserver(([mutation]) => {
        if (mutation.type === 'childList') {
          this.getElement<Element>(selector)
            .then((target) => {
              if (target) {
                cleanup()
                resolve(target)
              }
            })
            .catch(reject)
        }
      })

      const cleanup = () => {
        if (timer)
          clearTimeout(timer)

        if (mutation)
          mutation.disconnect()
      }

      if (timeout > 0) {
        setTimeout(() => {
          cleanup()
          reject(new Error('Target: timeout'))
        }, timeout)
      }

      mutation.observe(document.body, { childList: true, subtree: true })

      this.getElement<Element>(selector)
        .then((target) => {
          if (target) {
            cleanup()
            resolve(target)
          }
        })
        .catch(reject)
    })
  }

  public async next () {
    await this.parent.next()
  }

  public async prev () {
    await this.parent.prev()
  }

  protected abstract run (): void | Promise<void>
}
