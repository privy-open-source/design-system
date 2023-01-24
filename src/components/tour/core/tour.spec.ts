import { vi } from 'vitest'
import { MockStep } from '../__mocks__/step'
import { TourDirection } from './base'
import StepCondition from './step/conditional'
import { Tour } from './tour'

describe('Basic functionality tour', () => {
  it('should able run all steps', async () => {
    const step1 = new MockStep()
    const step2 = new MockStep()

    const tour = new Tour()

    tour.add(step1)
    tour.add(step2)

    await tour.start()

    expect(step1.hit).toBeCalled()
    expect(step2.hit).not.toBeCalled()

    await step1.next() // Simulate user click next

    expect(step2.hit).toBeCalled()
  })

  it('should trigger on-finish-hook when reach last step', async () => {
    const onFinished = vi.fn()
    const tour       = new Tour({ onFinished })

    tour.add(new MockStep())
    tour.add(new MockStep())

    await tour.start()
    await tour.next()
    await tour.next()
    await tour.next()

    expect(onFinished).toBeCalled()
  })

  it('should able to remove the step', async () => {
    const step1 = new MockStep()
    const step2 = new MockStep({ name: 'step2' })
    const step3 = new MockStep()
    const step4 = new MockStep()

    const tour = new Tour()

    tour.add(step1)
    tour.add(step2)
    tour.add(step3)
    tour.add(step4)

    // Delete using index
    tour.remove(2)

    // Delete using reference
    tour.remove(step1)

    // Delete using name
    tour.remove('step2')

    await tour.start()
    await tour.next()
    await tour.next()

    expect(step1.hit).not.toBeCalled()
    expect(step2.hit).not.toBeCalled()
    expect(step3.hit).not.toBeCalled()
    expect(step4.hit).toBeCalled()
  })

  it('should stop the tour if step thrown an error', async () => {
    const tour = new Tour()
    const step = new MockStep()

    step.hit.mockRejectedValueOnce(new Error('MOCK_ERROR'))

    tour.add(step)

    await tour.start()

    expect(tour.isRunning()).toBe(false)
  })

  it('should skip to next step if step thrown an error', async () => {
    const tour  = new Tour({ skipOnError: true })
    const step1 = new MockStep()
    const step2 = new MockStep()

    step1.hit.mockRejectedValueOnce(new Error('MOCK_ERROR'))

    tour.add(step1)
    tour.add(step2)

    await tour.start()

    expect(tour.isRunning()).toBe(true)
    expect(step2.hit).toBeCalled()
  })

  it('should also skip step on backward', async () => {
    const tour  = new Tour()
    const step1 = new MockStep()
    const step2 = new MockStep({ skipOnError: true })
    const step3 = new MockStep()

    step2.hit.mockRejectedValueOnce(new Error('MOCK_ERROR'))

    tour.add(step1)
    tour.add(step2)
    tour.add(step3)

    // Start last step
    await tour.setDirection(TourDirection.BACKWARD).start()
    await tour.prev()

    expect(tour.isRunning()).toBe(true)
    expect(step3.hit).toBeCalled()
    expect(step1.hit).toBeCalled()
  })
})

describe('Nesting', () => {
  it('should able to return total of step, including child tour and conditional', () => {
    const level1 = new Tour()
    const level2 = new Tour()
    const level3 = new Tour()
    const level4 = new Tour()

    level1.add(new MockStep())
    level1.add(new MockStep())

    level2.add(new MockStep())
    level2.add(new MockStep())

    level3.add(new MockStep())
    level3.add(new MockStep())

    level4.add(new MockStep())
    level4.add(new MockStep())

    level2.add(level3) // add level3 into level2
    level1.add(level2) // add level2 into level1

    level1.add(new StepCondition({
      condition: () => true,
      tour     : level4,
    }))

    expect(level1.getTotal()).toBe(8)
    expect(level2.getTotal()).toBe(8)
    expect(level3.getTotal()).toBe(8)
  })

  it('should able return current index, including child tour', async () => {
    const level1 = new Tour()
    const level2 = new Tour()
    const level3 = new Tour()

    level2.add(new MockStep())
    level2.add(new MockStep())

    level3.add(new MockStep())
    level3.add(new MockStep())

    level2.add(level3) // add level3 into level2
    level1.add(level2) // add level2 into level1

    level1.add(new MockStep())
    level1.add(new MockStep())

    await level1.start()
    await level1.next()
    await level1.next()
    await level1.next()

    /**
     * Tour (level 1):
     *   steps:
     *     - Tour (level2)
     *        steps:
     *          - MockStep          => index: 0th
     *          - MockStep          => index: 1st
     *          - Tour (level3),
     *              steps:
     *                - MockStep    => index: 2nd
     *                - MockStep    => index: 3rd
     *     - MockStep               => index: 4th
     *     - MockStep               => index: 5th (current position)
     */

    expect(level1.getIndex()).toBe(5)
    expect(level2.getIndex()).toBe(5)
  })

  it('should trigger next on parent when call next on last step', async () => {
    const level1 = new Tour()
    const level2 = new Tour()

    const step3 = new MockStep()

    level2.add(new MockStep())
    level2.add(new MockStep())

    level1.add(level2)
    level1.add(step3)

    await level1.start()
    await level2.next()
    await level2.next()

    expect(step3.hit).toBeCalled()
  })

  it('should trigger prev on parent when call prev on first step', async () => {
    const level1 = new Tour()
    const level2 = new Tour()

    const step1 = new MockStep()

    level2.add(new MockStep())
    level2.add(new MockStep())

    level1.add(step1)
    level1.add(level2)
    level1.add(new MockStep())

    await level1.setDirection(TourDirection.BACKWARD).start()
    await level1.prev()
    await level2.prev()
    await level2.prev()

    expect(step1.hit).toBeCalled()
  })

  it('should remove the child itself when called remove', async () => {
    const level1 = new Tour()
    const level2 = new Tour()

    const step = new MockStep()

    level2.add(new MockStep())
    level2.add(new MockStep())

    level1.add(level2)
    level1.add(step)

    level2.remove()

    await level1.start()

    expect(step.hit).toBeCalled()
  })

  it('should handle skipOnError differently every tour instance', async () => {
    const mainTour = new Tour()
    const subTourA = new Tour({ skipOnError: true })
    const subTourB = new Tour({ skipOnError: false })

    const stepA1 = new MockStep()
    const stepB1 = new MockStep()
    const stepC1 = new MockStep()
    const stepC2 = new MockStep()

    stepA1.hit.mockRejectedValueOnce(new Error('fail'))
    stepB1.hit.mockRejectedValueOnce(new Error('fail'))

    subTourA.add(stepA1)
    subTourB.add(stepB1)

    mainTour
      .add(subTourA)
      .add(stepC1)
      .add(subTourB)
      .add(stepC2)

    /**
     * steo1 (subTourA) => skip
     * step2 (stepC1)   => running
     * step3 (subTourB) => error  -> should tour stopped
     * step4 (stepC2)   => never  -> should never run
     */

    await mainTour.start()

    expect(mainTour.isRunning()).toBe(true)
    expect(stepC1.hit).toBeCalled()

    await mainTour.next()

    expect(mainTour.isRunning()).toBe(false)
    expect(stepC2.hit).not.toBeCalled()
  })
})
