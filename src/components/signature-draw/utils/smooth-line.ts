import type { DrawLineCoordinate } from './canvas'

/**
 * Smoothing Line for Signature Draw
 *
 * Originally taken from [SignatureMark's stroke](https://github.com/motdotla/signature-mark/blob/master/src/signature-mark/stroke.js)
 */
export class SmoothLine {
  protected lastX: number
  protected lastY: number

  protected movingX: number
  protected movingY: number

  protected smoother: number

  /**
   *
   * @param smoother 0.1 - 0.9
   */
  constructor (smoother: number) {
    this.lastX = 0
    this.lastY = 0

    this.movingX = 0
    this.movingY = 0

    this.smoother = smoother * 0.05 + 0.7
  }

  /**
   * Set start point
   * @param x X coordinate
   * @param y Y coordinate
   */
  start (x: number, y: number) {
    this.lastX = x
    this.lastY = y

    this.movingX = 0
    this.movingY = 0
  }

  /**
   * Update coordinate when drawing
   * @param x mouse X coordinate
   * @param y mouse Y coordinate
   * @return [x0, x0, x1, y1]
   */
  move (x: number, y: number): DrawLineCoordinate {
    const x0 = this.lastX
    const y0 = this.lastY

    const ax = (this.movingX + (x0 - x) * 0.1) * this.smoother
    const ay = (this.movingY + (y0 - y) * 0.1) * this.smoother

    const x1 = x0 - ax
    const y1 = y0 - ay

    this.movingX = ax
    this.movingY = ay

    this.lastX = x1
    this.lastY = y1

    return [
      x0,
      y0,
      x1,
      y1,
    ]
  }
}

/**
 * Create line n-times
 * @param length
 */
export function createLines (length: number): SmoothLine[] {
  return Array.from({ length }, (_, i) => new SmoothLine(i / (length * 1.25)))
}
