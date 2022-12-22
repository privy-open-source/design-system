import { vi, Mock } from 'vitest'
import { AbstractStep } from '../core/step'

export class MockStep extends AbstractStep<{ id?: string }> {
  public hit: Mock = vi.fn(async () => await Promise.resolve())

  protected async run () {
    await this.hit()
  }
}
