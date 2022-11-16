import { vi } from 'vitest'
import { AbstractTour } from '../core/base'

export class MockTour extends AbstractTour {
  public start = vi.fn()

  public stop = vi.fn()

  public next = vi.fn(async () => {
    await this.runOnNextHooks(this, this)
  })

  public prev = vi.fn(async () => {
    await this.runOnPrevHooks(this, this)
  })

  public getIndex = vi.fn(() => {
    return 0
  })

  public getTotal = vi.fn(() => {
    return 5
  })
}
