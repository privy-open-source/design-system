import { ref } from 'vue-demi'
import { MockStep } from '../../__mocks__/step'
import { TourDirection } from '../base'
import { Tour } from '../tour'
import StepCondition, { ConditionalType } from './conditional'

it('should run the subtour when condition is true', async () => {
  const tour    = new Tour()
  const subTour = new Tour()
  const subStep = new MockStep()
  const step    = new MockStep()
  const ifStep  = new StepCondition({
    condition: true,
    tour     : subTour,
  })

  subTour.add(subStep)
  tour.add(ifStep).add(step)

  await tour.start()

  expect(subStep.hit).toBeCalled()
  expect(subTour.isRunning()).toBe(true)

  await tour.next()

  expect(step.hit).toBeCalled()
  expect(subTour.isRunning()).toBe(false)
})

it('should run the subtour when condition is false', async () => {
  const tour     = new Tour()
  const subTour  = new Tour()
  const subStep  = new MockStep()
  const lastStep = new MockStep()
  const step     = new StepCondition({
    condition: () => false,
    tour     : subTour,
  })

  subTour.add(subStep)
  tour.add(step).add(lastStep)

  await tour.start()

  expect(subStep.hit).not.toBeCalled()
  expect(lastStep.hit).toBeCalled()
})

it('should run the subtour on last step if `prev` called', async () => {
  const tour     = new Tour()
  const subTour  = new Tour()
  const subStep  = new MockStep()
  const subStep2 = new MockStep()
  const lastStep = new MockStep()
  const step     = new StepCondition({
    condition: true,
    tour     : subTour,
  })

  subTour.add(subStep).add(subStep2)
  tour.add(step).add(lastStep)

  await tour.setDirection(TourDirection.BACKWARD).start()
  await tour.prev()

  expect(lastStep.hit).toBeCalled()
  expect(subStep2.hit).toBeCalled()
})

it('should accept ref as condition', async () => {
  const isChecked = ref(true)
  const tour      = new Tour()
  const subTour   = new Tour()
  const subStep   = new MockStep()
  const step      = new StepCondition({
    condition: isChecked,
    tour     : subTour,
  })

  subTour.add(subStep)
  tour.add(step)

  await tour.start()

  expect(subStep.hit).toBeCalled()
})

it('should not run if condition is a function and thrown an error', async () => {
  const tour     = new Tour()
  const subTour  = new Tour()
  const subStep  = new MockStep()
  const lastStep = new MockStep()
  const step     = new StepCondition({
    tour     : subTour,
    condition: async () => {
      throw new Error('Fail')
    },
  })

  subTour.add(subStep)
  tour.add(step).add(lastStep)

  await tour.start()

  expect(subStep.hit).not.toBeCalled()
  expect(lastStep.hit).toBeCalled()
})

it('should run next routine, if first routine false', async () => {
  const tour     = new Tour()
  const subTour  = new Tour()
  const subStep  = new MockStep()
  const subTour2 = new Tour()
  const subStep2 = new MockStep()
  const lastStep = new MockStep()
  const step     = new StepCondition({
    condition: () => false,
    tour     : subTour.add(subStep),
  })

  step.chain({
    type     : ConditionalType.ELSE_IF,
    condition: () => true,
    tour     : subTour2.add(subStep2),
  })

  tour.add(step).add(lastStep)

  await tour.start()

  expect(subStep.hit).not.toBeCalled()
  expect(subStep2.hit).toBeCalled()
  expect(lastStep.hit).not.toBeCalled()
})
