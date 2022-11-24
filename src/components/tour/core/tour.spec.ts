import { MockStep } from '../__mocks__/step'
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
  })
})
