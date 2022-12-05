export type HookFn = (...args: unknown[]) => unknown | Promise<unknown>

export async function runHook<H extends HookFn> (hook: H, ...args: Parameters<H>): Promise<boolean> {
  try {
    return (await hook(...args)) !== false
  } catch {
    return false
  }
}

export async function runAllHooks<H extends HookFn> (hooks: Iterable<H>, ...args: Parameters<H>): Promise<boolean> {
  let result = true

  for (const hook of hooks) {
    result = await runHook(hook, ...args)

    if (!result)
      break
  }

  return result
}

export class Hook<H extends HookFn> {
  protected hooks: H[]

  constructor () {
    this.hooks = []
  }

  add (hook: H) {
    this.hooks.unshift(hook)

    return this
  }

  remove (hook: H) {
    const index = this.hooks.indexOf(hook)

    if (index > -1)
      this.hooks.splice(index, 1)

    return this
  }

  async run (...args: Parameters<H>) {
    return await runAllHooks(this.hooks, ...args)
  }
}
