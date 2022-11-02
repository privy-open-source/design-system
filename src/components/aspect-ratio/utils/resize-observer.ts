import { calculateRatio } from './calculate-ratio'

let observer: ResizeObserver

export async function getObserver () {
  let Observer = window.ResizeObserver

  /**
   * Load polyfill if browsers don't support ResizeObserver
   */
  if (!Observer) {
    const {
      ResizeObserver: Polyfill,
    } = await import('@juggle/resize-observer')

    Observer = Polyfill
  }

  if (!observer) {
    observer = new Observer((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement
        const ratio  = Number.parseFloat(target.dataset.aspectRatio)
        const fixed  = target.dataset.aspectFixed === 'true'

        calculateRatio(target, ratio, fixed)
      }
    })
  }

  return observer
}
