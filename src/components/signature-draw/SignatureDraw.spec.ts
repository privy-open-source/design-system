import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'
import { fireEvent, render } from '@testing-library/vue'
import type * as VueUse from '@vueuse/core'
import { useMediaQuery, setMediaQuery } from './__mocks__/use-window-size'
import { triggerDraw, useDraw } from './__mocks__/use-draw'
import * as canvas from './__mocks__/canvas'
import SignatureDraw from './SignatureDraw.vue'
import { delay } from 'nanodelay'

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
  vi.restoreAllMocks()
})

it('should use signature based on media-query', async () => {
  await setMediaQuery('mobile')

  const screen = render({
    components: { SignatureDraw },
    template  : '<SignatureDraw />',
  })

  await delay(0)

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

it('should passthrought v-model', async () => {
  await setMediaQuery('desktop')

  const model  = ref('')
  const screen = render({
    components: { SignatureDraw },
    template  : '<SignatureDraw v-model.base64="model" />',
    setup () {
      return { model }
    },
  })

  await delay(0)

  triggerDraw()
  await nextTick()

  expect(model.value).toStartWith('data:image/png')

  const reset = screen.queryByTestId('signature-draw-reset')

  expect(reset).toBeInTheDocument()

  await fireEvent.click(reset)

  expect(model.value).toBe('')
})
