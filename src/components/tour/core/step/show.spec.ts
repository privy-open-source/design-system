import { queryByTestId } from '@testing-library/dom'
import { MockTour } from '../../__mocks__/tour'
import StepShow from './show'

beforeEach(() => {
  const sample = document.createElement('div')

  sample.id = 'sample'

  document.body.append(sample)
})

it('should able to show tour-card', async () => {
  const parent = new MockTour()
  const step   = new StepShow({
    target: '#sample',
    title : 'Hello',
    text  : 'This is tour',
    image : 'http://image.com/50x50',
  })

  await step.setParent(parent).start()

  const tour  = queryByTestId(document.body, 'tour-card')
  const title = queryByTestId(document.body, 'tour-title')
  const text  = queryByTestId(document.body, 'tour-text')
  const img   = queryByTestId(document.body, 'tour-image')

  expect(tour).toBeInTheDocument()
  expect(title).toHaveTextContent('Hello')
  expect(text).toHaveTextContent('This is tour')
  expect(img).toHaveAttribute('src', 'http://image.com/50x50')
})
