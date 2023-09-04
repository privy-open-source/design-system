import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { useWindowSize, setWindowSize } from '../__mocks__/use-window-size'
import { templateRef } from '@vueuse/core'
import type * as VueUse from '@vueuse/core'
import { useSticky } from './use-sticky'

vi.mock('@vueuse/core', async () => {
  const vueuse = await vi.importActual('@vueuse/core')

  return {
    ...vueuse as typeof VueUse,
    useWindowSize,
  }
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should set element height to fit window height', async () => {
  const screen = render({
    template: `
      <div>
        <div
          data-testid="target"
          ref="target">
          Box
        </div>
      </div>
    `,
    setup () {
      const target = templateRef<HTMLDivElement>('target')
      const sticky = useSticky(target)

      sticky.value = true

      return {}
    },
  })

  const target = screen.queryByTestId('target') as HTMLDivElement

  setWindowSize(1000)

  vi.spyOn(target.parentElement, 'getBoundingClientRect')
    .mockReturnValue({
      top   : 300,
      y     : 300,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  vi.spyOn(target, 'getBoundingClientRect')
    .mockReturnValue({
      top   : 300,
      y     : 300,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  await fireEvent.scroll(window)

  expect(target).toBeInTheDocument()
  expect(target).toHaveStyle({ height: '700px' })
})

it('should ', async () => {
  const screen = render({
    template: `
      <div>
        <div
          data-testid="target"
          ref="target">
          Box
        </div>
      </div>
    `,
    setup () {
      const target = templateRef<HTMLDivElement>('target')
      const sticky = useSticky(target)

      sticky.value = true

      return {}
    },
  })

  const target = screen.queryByTestId('target') as HTMLDivElement

  setWindowSize(1000)

  vi.spyOn(target.parentElement, 'getBoundingClientRect')
    .mockReturnValue({
      top   : -50,
      y     : -50,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  vi.spyOn(target, 'getBoundingClientRect')
    .mockReturnValue({
      top   : 0,
      y     : 0,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  await fireEvent.scroll(window)

  expect(target).toBeInTheDocument()
  expect(target).toHaveStyle({
    position: 'fixed',
    top     : '0px',
    left    : '0px',
    width   : '300px',
    height  : '1000px',
  })
})
