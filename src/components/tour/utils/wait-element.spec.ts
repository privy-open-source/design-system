import { vi } from 'vitest'
import { isVisible, focus } from './__mocks__/is-visible'
import MutationObserver, { triggerMutation } from './__mocks__/mutation-observer'
import { waitElement } from './wait-element'

vi.mock('./is-visible.ts', () => ({ isVisible, focus }))

vi.stubGlobal('MutationObserver', MutationObserver)

it('should able to get element match by querySelector', async () => {
  const sample = document.createElement('div')

  sample.id = 'sample'

  document.body.append(sample)

  const target = await waitElement('#sample')

  expect(target).toBe(sample)
})

it('should throw error if target not visible', () => {
  isVisible.mockReturnValueOnce(false)

  const sample = document.createElement('div')

  sample.id = 'sample'

  document.body.append(sample)

  const promise = waitElement('#sample')

  expect(promise).toReject()
})

it('should throw error if target not visible', async () => {
  vi.useFakeTimers()

  const promise = waitElement('#sample', 100)

  vi.advanceTimersByTime(200)

  await expect(promise).toReject()

  vi.useRealTimers()
})

it('should throw error if target not visible', async () => {
  const promise = waitElement('#sample')
  const sample  = document.createElement('div')

  sample.id = 'sample'

  document.body.append(sample)

  triggerMutation()

  await expect(promise).toResolve()
})
