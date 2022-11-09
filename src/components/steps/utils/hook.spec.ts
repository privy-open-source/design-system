import { vi } from 'vitest'
import { runAllHooks, runHook } from './hook'

describe('runHook', () => {
  it('should execute hook', async () => {
    const hook   = vi.fn(() => true)
    const result = await runHook(hook, 1, 2)

    expect(hook).toBeCalledWith(1, 2)
    expect(result).toBe(true)
  })

  it('should return false if hook thrown error', async () => {
    const hook   = vi.fn(() => true).mockRejectedValueOnce(new Error('ERR'))
    const result = await runHook(hook, 1, 2)

    expect(hook).toBeCalledWith(1, 2)
    expect(result).toBe(false)
  })
})

describe('runAllHook', () => {
  it('should execute all hooks', async () => {
    const hook1 = vi.fn(() => true)
    const hook2 = vi.fn(() => true)
    const hook3 = vi.fn(() => true)
    const hooks = [
      hook1,
      hook2,
      hook3,
    ]

    const result = await runAllHooks(hooks, 1, 2)

    expect(hook1).toBeCalledWith(1, 2)
    expect(hook2).toBeCalledWith(1, 2)
    expect(hook3).toBeCalledWith(1, 2)
    expect(result).toBe(true)
  })

  it('should not run hook if one of hook result false in the middle', async () => {
    const hook1 = vi.fn(() => true)
    const hook2 = vi.fn(() => true)
    const hook3 = vi.fn(() => true)
    const hooks = [
      hook1,
      hook2,
      hook3,
    ]

    hook2.mockReturnValueOnce(false)

    const result = await runAllHooks(hooks, 1, 2)

    expect(hook1).toBeCalledWith(1, 2)
    expect(hook2).toBeCalledWith(1, 2)
    expect(hook3).not.toBeCalledWith(1, 2)
    expect(result).toBe(false)
  })
})
