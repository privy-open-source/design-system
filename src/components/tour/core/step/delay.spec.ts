import { vi } from 'vitest'
import { nextTick } from 'vue-demi'
import { MockTour } from '../../__mocks__/tour'
import StepDelay from './delay'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should call next after some millisecond', async () => {
  const parent = new MockTour()
  const step   = new StepDelay({ duration: 500 })

  step.setParent(parent).start()

  vi.advanceTimersByTime(501)

  await nextTick()

  expect(parent.next).toBeCalled()
})

it('should call prev if direction backward', async () => {
  const parent = new MockTour()
  const step   = new StepDelay({ duration: 500 })

  step.setParent(parent)
    .setDirection(-1)
    .start()

  expect(parent.prev).not.toBeCalled()

  vi.advanceTimersByTime(501)

  await nextTick()

  expect(parent.prev).toBeCalled()
})
