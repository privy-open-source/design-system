export type TravelHook = (to: number, from: number) => boolean | Promise<boolean>

export type FinishedHook = () => void | Promise<void>

export async function runHook (hook: TravelHook, ...args: Parameters<TravelHook>): Promise<boolean> {
  try {
    return await hook.call(this, ...args)
  } catch {
    return false
  }
}

export async function runAllHooks (hooks: TravelHook[], ...args: Parameters<TravelHook>): Promise<boolean> {
  let result = true

  for (const hook of hooks) {
    result = await runHook(hook, ...args)

    if (!result)
      break
  }

  return result
}
