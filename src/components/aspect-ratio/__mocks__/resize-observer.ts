const instances = new Set<ResizeObserver>()

export class ResizeObserver {
  public handler: ResizeObserverCallback
  public targets: Set<HTMLElement>

  constructor (handler: ResizeObserverCallback) {
    this.handler = handler
    this.targets = new Set()

    instances.add(this)
  }

  observe (el: HTMLElement) {
    this.targets.add(el)
  }

  unobserve (el: HTMLElement) {
    this.targets.delete(el)
  }

  disconnect () {
    this.targets.clear()
  }
}

export function triggerChange () {
  for (const observer of instances) {
    const entries = [...observer.targets].map((target) => {
      return { target } as unknown as ResizeObserverEntry
    })

    observer.handler(entries, observer)
  }
}
