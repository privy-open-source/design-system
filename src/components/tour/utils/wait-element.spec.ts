import { vi } from 'vitest'
import { isVisible, focus } from './__mocks__/is-visible'
import { waitElement } from './wait-element'

vi.mock('./is-visible.ts', () => ({ isVisible, focus }))

it('should able to get element match by querySelector', async () => {
  const sample = document.createElement('div')

  sample.id = 'sample'

  document.body.append(sample)

  const target = await waitElement('#sample')

  expect(target).toBe(sample)
})

it('should throw error if target not visible', () => {
  isVisible.mockResolvedValue(false)

  const sample = document.createElement('div')

  sample.id = 'sample'

  document.body.append(sample)

  const promise = waitElement('#sample')

  expect(promise).toReject()
})
it('should throw error if target not visible', () => {
  vi.useFakeTimers()

  const promise = waitElement('#sample', 100)

  vi.advanceTimersByTime(200)

  expect(promise).toReject()
})
