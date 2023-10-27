import type { DrawLineCoordinate } from './canvas'

export class StraightLine {
  protected lastX: number
  protected lastY: number

  constructor () {
    this.lastX = 0
    this.lastY = 0
  }

  start (x: number, y: number) {
    this.lastX = x
    this.lastY = y
  }

  move (x: number, y: number): DrawLineCoordinate {
    const x0 = this.lastX
    const y0 = this.lastY

    this.lastX = x
    this.lastY = y

    return [
      x0,
      y0,
      x,
      y,
    ]
  }
}
