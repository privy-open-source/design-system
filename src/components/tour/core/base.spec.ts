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

    await tour.next()
    await tour.prev()

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

    await grantParent.next()
    await grantParent.prev()

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

    await grantParent.next()
    await grantParent.prev()

    expect(onBeforePrev).toBeCalledTimes(1)
    expect(onBeforeNext).toBeCalledTimes(1)

    tour.detach(parent)

    await grantParent.next()
    await grantParent.prev()

    expect(onBeforePrev).toBeCalledTimes(1)
    expect(onBeforeNext).toBeCalledTimes(1)
  })
})
