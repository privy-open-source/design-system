import { vi } from 'vitest'

export const chartRender = vi.fn()

export const chartDestroy = vi.fn()

export class MockChart {
  public options: Record<string, unknown>
  public data: Record<string, unknown>
  public canvas: HTMLCanvasElement

  constructor (canvas: HTMLCanvasElement, options: Record<string, unknown>) {
    this.canvas  = canvas
    this.options = options
    this.data    = options.data as Record<string, unknown>

    chartRender(this.data)
  }

  update () {
    chartRender(this.data)
  }

  destroy () {
    chartDestroy()
  }
}
