import { isVisible, focus } from './is-visible'

/**
 * Get element and throw error if target not visible
 * @param selector query selector
 */
async function getVisibleElement<Element extends HTMLElement> (selector: string): Promise<Element> {
  const target = document.querySelector<Element>(selector)

  if (target) {
    await focus(target)

    if (!isVisible(target))
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
        getVisibleElement<Element>(selector)
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

    getVisibleElement<Element>(selector)
      .then((target) => {
        if (target) {
          cleanup()
          resolve(target)
        }
      })
      .catch(reject)
  })
}
