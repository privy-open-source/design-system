import { vi } from 'vitest'

const handlers = []

export default class MutationObserver {
  constructor (callback: MutationCallback) {
    handlers.push(callback)
  }

  public observe = vi.fn()

  public disconnect = vi.fn()
}

export function triggerMutation () {
  for (const handler of handlers)
    handler([{ type: 'childList' }])
}
