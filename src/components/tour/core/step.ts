import { focus, isVisible } from '../utils/dom'
import { AbstractTour } from './base'
import type { Tour, TourOptions } from './tour'

type Merge<A, B> = Omit<A, keyof B> & B
type BaseOptions = Omit<TourOptions, 'onFinished'>

export abstract class AbstractStep<Opt = {}> extends AbstractTour<Merge<BaseOptions, Opt>> {
  parent?: Tour

  public async start () {
    this.attach(this.parent)

    await this.mount()
  }

  public async stop () {
    await this.unmount()

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
              if (target)
                resolve(target)
            })
            .catch(reject)
            .finally(cleanup)
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
          if (target)
            resolve(target)
        })
        .catch(reject)
        .finally(cleanup)
    })
  }

  public async next () {
    await this.parent.next()
  }

  public async prev () {
    await this.parent.prev()
  }

  protected abstract mount (): void | Promise<void>

  protected abstract unmount (): void | Promise<void>
}
