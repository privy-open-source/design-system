import { vi } from 'vitest'
import { nextTick } from 'vue-demi'
import useLoading from './use-loading'
import { delay } from 'nanodelay'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should be "true" until all async function finish up ()', async () => {
  const loading = useLoading()

  const fnA = () => {
    loading.value = true

    delay(1000).finally(() => {
      loading.value = false
    })
  }

  const fnB = () => {
    loading.value = true

    delay(3000).finally(() => {
      loading.value = false
    })
  }

  fnA()
  fnB()

  expect(loading.value).toBe(true)

  vi.advanceTimersByTime(2000)
  await nextTick()

  expect(loading.value).toBe(true)

  vi.advanceTimersByTime(1000)
  await nextTick()

  expect(loading.value).toBe(false)
})

it('should be "true" in elapsed time (the first 200ms)', async () => {
  const loading = useLoading()

  expect(loading.value).toBe(true)

  vi.advanceTimersByTime(200)
  await nextTick()

  expect(loading.value).toBe(false)
})

it('should be "false" if elapsed time is turned off', async () => {
  const loading = useLoading({ elapsed: false })

  expect(loading.value).toBe(false)

  vi.advanceTimersByTime(200)
  await nextTick()

  expect(loading.value).toBe(false)
})

it('should be able to set elapsed time via option', async () => {
  const loading = useLoading({ elapsed: 500 })

  expect(loading.value).toBe(true)

  vi.advanceTimersByTime(200)
  await nextTick()

  expect(loading.value).toBe(true)

  vi.advanceTimersByTime(300)
  await nextTick()

  expect(loading.value).toBe(false)
})
