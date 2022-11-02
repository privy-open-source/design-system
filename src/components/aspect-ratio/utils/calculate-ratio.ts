/**
 * Calculate and apply ratio to element
 * @param el HTMLElement
 * @param ratio aspect ratio
 * @param fixed enable fixed size
 */
export function calculateRatio (el: HTMLElement, ratio: number, fixed = false): void {
  if (Number.isFinite(ratio)) {
    const width  = el.clientWidth
    const height = width / ratio

    if (fixed)
      el.style.height = `${height}px`
    else
      el.style.minHeight = `${height}px`
  }
}
