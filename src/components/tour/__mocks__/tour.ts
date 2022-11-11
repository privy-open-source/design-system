import { vi } from 'vitest'
import { AbstractTour } from '../core/base'

export class MockTour extends AbstractTour {
  public start = vi.fn()
  public stop = vi.fn()
  public next = vi.fn()
  public prev = vi.fn()
}
