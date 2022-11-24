const handlers = []

export default class MutationObserver {
  constructor (callback: MutationCallback) {
    handlers.push(callback)
  }

  observe () {}

  disconnect () {}
}

export function triggerMutation () {
  for (const handler of handlers)
    handler([{ type: 'childList' }])
}
