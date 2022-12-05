import { vi } from 'vitest'
import { calculateRatio } from './calculate-ratio'

it('should able to calculate ratio from element width', () => {
  const element = document.createElement('div')

  document.body.append(element)

  vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(400)

  calculateRatio(element, 4 / 3)

  expect(element).toHaveStyle({ minHeight: '300px' })
})

it('should use `height` instead of `min-height` if fixed size is set to `true`', () => {
  const element = document.createElement('div')

  document.body.append(element)

  vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(400)

  calculateRatio(element, 4 / 3, true)

  expect(element).toHaveStyle({ height: '300px' })
  expect(element).not.toHaveStyle({ minHeight: '300px' })
})
