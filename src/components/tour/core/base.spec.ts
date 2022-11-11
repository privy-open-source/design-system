import { vi } from 'vitest'
import { MockTour } from '../__mocks__/tour'

describe('Hookable', () => {
  it('should run all hooks', async () => {
    const onBeforePrev = vi.fn()
    const onBeforeNext = vi.fn()

    const tour = new MockTour({
      onBeforePrev,
      onBeforeNext,
    })

    // @ts-expect-error
    await tour.runOnPrevHooks()
    // @ts-expect-error
    await tour.runOnNextHooks()

    expect(onBeforePrev).toBeCalled()
    expect(onBeforeNext).toBeCalled()
  })

  it('parent should run all hooks in child if child attach to parent', async () => {
    const onBeforePrev = vi.fn()
    const onBeforeNext = vi.fn()

    const tour = new MockTour({
      onBeforePrev,
      onBeforeNext,
    })

    const parent      = new MockTour()
    const grantParent = new MockTour()

    tour.attach(parent)
    parent.attach(grantParent)

    // @ts-expect-error
    await grantParent.runOnPrevHooks()
    // @ts-expect-error
    await grantParent.runOnNextHooks()

    expect(onBeforePrev).toBeCalled()
    expect(onBeforeNext).toBeCalled()
  })

  it('should not run the hook anymore if child detach from their parent', async () => {
    const onBeforePrev = vi.fn()
    const onBeforeNext = vi.fn()

    const tour = new MockTour({
      onBeforePrev,
      onBeforeNext,
    })

    const parent      = new MockTour()
    const grantParent = new MockTour()

    tour.attach(parent)
    parent.attach(grantParent)

    // @ts-expect-error
    await grantParent.runOnPrevHooks()
    // @ts-expect-error
    await grantParent.runOnNextHooks()

    expect(onBeforePrev).toBeCalledTimes(1)
    expect(onBeforeNext).toBeCalledTimes(1)

    tour.detach(parent)

    // @ts-expect-error
    await grantParent.runOnPrevHooks()
    // @ts-expect-error
    await grantParent.runOnNextHooks()

    expect(onBeforePrev).toBeCalledTimes(1)
    expect(onBeforeNext).toBeCalledTimes(1)
  })
})
