export type HookFn = (...args: unknown[]) => unknown | Promise<unknown>

export async function runHook<H extends HookFn> (hook: H, ...args: Parameters<H>): Promise<boolean> {
  try {
    return (await hook(...args)) !== false
  } catch (error) {
    console.warn(error)

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
