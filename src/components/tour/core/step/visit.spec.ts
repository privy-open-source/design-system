import { initAppContext, useAppContext } from '../../../global/context'
import { MockTour } from '../../__mocks__/tour'
import StepVisit from './visit'

beforeEach(() => {
  let page = '/page-1'

  initAppContext({
    toURL (url) {
      page = url
    },
    getURL () {
      return page
    },
  })
})

it('should redirect to target url', async () => {
  const parent = new MockTour()
  const step   = new StepVisit({ url: '/page-2' })

  await step.setParent(parent).start()

  expect(useAppContext().getURL()).toBe('/page-2')
})

it('should redirect to backUrl if direction if backward', async () => {
  const parent = new MockTour()
  const step   = new StepVisit({ url: '/page-2', backUrl: '/page-404' })

  await step.setParent(parent).setDirection(-1).start()

  expect(useAppContext().getURL()).toBe('/page-404')
})

it('should redirect to last url if direction if backward and backURL not provided', async () => {
  const parent = new MockTour()
  const step   = new StepVisit({ url: '/page-2' })

  await step.setParent(parent).start()
  await step.stop()
  await step.setDirection(-1).start()

  expect(useAppContext().getURL()).toBe('/page-1')
})
