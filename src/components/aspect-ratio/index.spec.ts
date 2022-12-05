import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import { calculateRatio } from './__mocks__/calculate-ratio'
import { ResizeObserver, triggerChange } from './__mocks__/resize-observer'
import { delay } from 'nanodelay'
import { pAspectRatio, vPAspectRatio } from '.'

vi.mock('./utils/calculate-ratio.ts', () => {
  return { calculateRatio }
})

vi.stubGlobal('ResizeObserver', ResizeObserver)

afterEach(() => {
  vi.restoreAllMocks()
})

it('should able to calculate element ratio', async () => {
  const screen = render({
    directives: { pAspectRatio },
    template  : `
      <div
        data-testid="sample"
        v-p-aspect-ratio="4/3" />
    `,
  })

  const sample = screen.queryByTestId('sample')

  await delay(0)

  expect(sample).toBeInTheDocument()
  expect(sample).toHaveAttribute('data-aspect-ratio', `${4 / 3}`)
  expect(sample).toHaveAttribute('data-aspect-fixed', 'false')
  expect(calculateRatio).lastCalledWith(sample, 4 / 3, false)
})

it('should enable fixed size if modifiers fixed set to true', async () => {
  const screen = render({
    directives: { pAspectRatio },
    template  : `
      <div
        data-testid="sample"
        v-p-aspect-ratio.fixed="4/3" />
    `,
  })

  const sample = screen.queryByTestId('sample')

  await delay(0)

  expect(sample).toBeInTheDocument()
  expect(sample).toHaveAttribute('data-aspect-ratio', `${4 / 3}`)
  expect(sample).toHaveAttribute('data-aspect-fixed', 'true')
  expect(calculateRatio).lastCalledWith(sample, 4 / 3, true)
})

it('should recalculate ratio if element size changed', async () => {
  const screen = render({
    directives: { pAspectRatio },
    template  : `
      <div
        data-testid="sample"
        v-p-aspect-ratio.fixed="4/3" />
    `,
  })

  const sample = screen.queryByTestId('sample')

  await delay(0)

  expect(sample).toBeInTheDocument()
  expect(calculateRatio).toBeCalledTimes(1)

  triggerChange()

  expect(calculateRatio).toBeCalledTimes(2)
})

it('should export alias vPAspectRatio', () => {
  expect(vPAspectRatio).toBe(pAspectRatio)
})
