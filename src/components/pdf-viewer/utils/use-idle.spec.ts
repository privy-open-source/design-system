import { fireEvent } from '@testing-library/dom'
import { vi } from 'vitest'
import { useIdle } from './use-idle'

it('should true if no activities in spesific time', () => {
  vi.useFakeTimers()

  const idle = useIdle(document.body, 5000)

  fireEvent.mouseMove(document.body)

  vi.advanceTimersByTime(2000)

  expect(idle.value).toBe(false)

  fireEvent.mouseMove(document.body)

  expect(idle.value).toBe(false)

  vi.advanceTimersByTime(7000)

  expect(idle.value).toBe(true)
})
