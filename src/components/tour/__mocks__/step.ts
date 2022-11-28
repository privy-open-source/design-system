import { vi } from 'vitest'
import { AbstractStep } from '../core/step'

export class MockStep extends AbstractStep<void> {
  public hit = vi.fn(async () => await Promise.resolve())

  protected async run () {
    await this.hit()
  }
}
