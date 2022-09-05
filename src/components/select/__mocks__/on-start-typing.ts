export const handlers: Array<() => void> = []

export function triggerTyping () {
  for (const handler of handlers)
    handler()
}

export function onStartTyping (handler: () => void): void {
  handlers.push(handler)
}
