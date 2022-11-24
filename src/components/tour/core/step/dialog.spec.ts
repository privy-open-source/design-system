import { fireEvent, queryByTestId } from '@testing-library/dom'
import { vi } from 'vitest'
import { MockTour } from '../../__mocks__/tour'
import StepDialog from './dialog'

vi.mock('../../utils/is-visible.ts')

beforeAll(() => {
  const sample = document.createElement('div')

  sample.id = 'sample'

  document.body.append(sample)
})

it('should able to show tour-dialog', async () => {
  const parent = new MockTour()
  const step   = new StepDialog({
    target: '#sample',
    title : 'Hello',
    text  : 'This is tour',
    image : 'http://image.com/50x50',
  })

  await step.setParent(parent).start()

  const tour  = queryByTestId(document.body, 'tour-dialog')
  const title = queryByTestId(document.body, 'tour-title')
  const text  = queryByTestId(document.body, 'tour-text')
  const img   = queryByTestId(document.body, 'tour-image')

  expect(tour).toBeInTheDocument()
  expect(title).toHaveTextContent('Hello')
  expect(text).toHaveTextContent('This is tour')
  expect(img).toHaveAttribute('src', 'http://image.com/50x50')
})

it('should hide tour-dialog when stopped', async () => {
  const parent = new MockTour()
  const step   = new StepDialog({
    target: '#sample',
    title : 'Hello',
    text  : 'This is tour',
    image : 'http://image.com/50x50',
  })

  await step.setParent(parent).start()

  const tour = queryByTestId(document.body, 'tour-dialog')

  expect(tour).toBeInTheDocument()

  await step.stop()

  expect(tour).not.toBeInTheDocument()
})

it('should trigger to next step if card next button clicked', async () => {
  const parent = new MockTour()
  const step   = new StepDialog({
    target: '#sample',
    title : 'Hello',
    text  : 'This is tour',
    image : 'http://image.com/50x50',
  })

  await step.setParent(parent).start()

  const button = queryByTestId(document.body, 'tour-control-next')

  fireEvent.click(button)

  expect(parent.next).toBeCalled()
})

it('should trigger to previous step if card prev button clicked', async () => {
  const parent = new MockTour()
  const step   = new StepDialog({
    target: '#sample',
    title : 'Hello',
    text  : 'This is tour',
    image : 'http://image.com/50x50',
  })

  await step.setParent(parent).start()

  const button = queryByTestId(document.body, 'tour-control-prev')

  fireEvent.click(button)

  expect(parent.prev).toBeCalled()
})

it('should trigger to stop if card dismiss button clicked', async () => {
  const parent = new MockTour()
  const step   = new StepDialog({
    target: '#sample',
    title : 'Hello',
    text  : 'This is tour',
    image : 'http://image.com/50x50',
  })

  await step.setParent(parent).start()

  const button = queryByTestId(document.body, 'tour-dismiss')

  fireEvent.click(button)

  expect(parent.stop).toBeCalled()
})
