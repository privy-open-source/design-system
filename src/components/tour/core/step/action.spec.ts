import { vi } from 'vitest'
import StepAction from './action'
import { MockTour } from '../../__mocks__/tour'

beforeEach(() => {
  const sample = document.createElement('div')
  const input  = document.createElement('input')

  sample.id = 'sample'
  input.id  = 'input'

  document.body.append(sample)
  document.body.append(input)
})

it('should able to send user event to target and goto next step', async () => {
  const input  = document.querySelector('#input') as HTMLInputElement
  const parent = new MockTour()
  const step   = new StepAction({
    target: '#input',
    action: 'type',
    params: ['Hello'],
  })

  await step.setParent(parent).start()

  expect(parent.next).toBeCalled()
  expect(input.value).toBe('Hello')
})

it('should able to send user event to target and goto prev step if direction is backward', async () => {
  const onClick = vi.fn()
  const parent  = new MockTour()
  const step    = new StepAction({
    target: '#sample',
    action: 'click',
    params: undefined,
  })

  document.body
    .querySelector('#sample')
    .addEventListener('click', onClick, { once: true })

  await step.setParent(parent).setDirection(-1).start()

  expect(onClick).toBeCalled()
  expect(parent.prev).toBeCalled()
})
