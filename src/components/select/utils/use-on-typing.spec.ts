import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'
import { onFinishTyping, onStartTyping } from './use-on-typing'

describe('onStartTyping', () => {
  it('should invoke handler when value changed', async () => {
    const model   = ref('')
    const handler = vi.fn()

    onStartTyping(model, handler)

    model.value = 'Coba Lagi'
    await nextTick()

    expect(handler).toBeCalled()
  })
})

describe('onFinishTyping', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should invoke handler when value finished change (500ms after last changed)', async () => {
    const model   = ref('')
    const handler = vi.fn()

    onFinishTyping(model, handler)

    model.value = 'Coba'
    await nextTick()

    model.value = 'Coba Lagi'
    await nextTick()

    expect(handler).not.toBeCalled()

    vi.advanceTimersByTime(500)
    await nextTick()

    expect(handler).toBeCalled()
  })
})
