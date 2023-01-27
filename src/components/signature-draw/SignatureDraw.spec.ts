import { render } from '@testing-library/vue'
import type * as VueUse from '@vueuse/core'
import { vi } from 'vitest'
import { useMediaQuery, setMediaQuery } from './__mocks__/use-window-size'
import { useDraw } from './__mocks__/use-draw'
import * as canvas from './__mocks__/canvas'
import SignatureDraw from './SignatureDraw.vue'

vi.mock('./utils/use-draw.ts', () => ({ default: useDraw }))

vi.mock('./utils/canvas.ts', () => canvas)

vi.mock('@vueuse/core', async () => {
  const vueuse = await vi.importActual('@vueuse/core')

  return {
    ...vueuse as typeof VueUse,
    useMediaQuery,
  }
})

vi.spyOn(window.URL, 'createObjectURL')
  .mockImplementation((file: File) => {
    return `blob://${file.name}`
  })

afterEach(() => {
  vi.resetAllMocks()
})

it('should use signature based on media-query', async () => {
  await setMediaQuery('mobile')

  const screen = render({
    components: { SignatureDraw },
    template  : '<SignatureDraw />',
  })

  let mobile  = screen.queryByTestId('signature-draw-mobile')
  let desktop = screen.queryByTestId('signature-draw-desktop')

  expect(mobile).toBeInTheDocument()
  expect(desktop).not.toBeInTheDocument()

  await setMediaQuery('desktop')

  mobile  = screen.queryByTestId('signature-draw-mobile')
  desktop = screen.queryByTestId('signature-draw-desktop')

  expect(mobile).not.toBeInTheDocument()
  expect(desktop).toBeInTheDocument()
})
