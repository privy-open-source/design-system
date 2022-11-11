import { computePosition, hide } from '@floating-ui/dom'
import scrollIntoView from 'scroll-into-view'

export async function isVisible (target: HTMLElement) {
  const div = document.createElement('div')

  const { middlewareData } = await computePosition(target, div, {
    strategy  : 'absolute',
    middleware: [hide()],
  })

  div.remove()

  return !middlewareData.hide.referenceHidden
}

export async function focus (target: HTMLElement, duration = 330): Promise<unknown> {
  return await new Promise((resolve) => {
    scrollIntoView(target, { time: duration }, resolve)
  })
}

/**
 * Get element and throw error if target not visible
 * @param selector query selector
 */
export async function getElement<Element extends HTMLElement> (selector: string): Promise<Element> {
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
export async function waitElement<Element extends HTMLElement> (selector: string, timeout = 30_000): Promise<Element> {
  return await new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>

    const mutation = new MutationObserver(([mutation]) => {
      if (mutation.type === 'childList') {
        getElement<Element>(selector)
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
      timer = setTimeout(() => {
        cleanup()
        reject(new Error('Target: timeout'))
      }, timeout)
    }

    mutation.observe(document.body, { childList: true, subtree: true })

    getElement<Element>(selector)
      .then((target) => {
        if (target) {
          cleanup()
          resolve(target)
        }
      })
      .catch(reject)
  })
}
