export const handlers: Array<() => void> = []

export function triggerScroll () {
  for (const handler of handlers)
    handler()
}

export function onScrollBottom (_: unknown, handler: () => void): void {
  handlers.push(handler)
}
