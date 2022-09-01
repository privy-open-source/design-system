import { render, fireEvent } from '@testing-library/vue'
import { triggerDraw, useDraw } from './__mocks__/use-draw'
import * as canvas from './__mocks__/canvas'
import type * as VueUse from '@vueuse/core'
import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'
import { setWindow, useWindowSize } from './__mocks__/use-window-size'
import rotateImage from './__mocks__/rotate-image'
import SignatureDrawMobile from './SignatureDrawMobile.vue'

vi.mock('./utils/use-draw.ts', () => ({ default: useDraw }))

vi.mock('./utils/canvas.ts', () => canvas)

vi.mock('./utils/rotate-image.ts', () => ({ default: rotateImage }))

vi.mock('@vueuse/core', async () => {
  const vueuse = await vi.importActual('@vueuse/core')

  return {
    ...vueuse as typeof VueUse,
    useWindowSize,
  }
})

it('should render properly', () => {
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile />',
  })

  const draw = screen.queryByTestId('signature-draw-mobile')

  expect(draw).toBeInTheDocument()
})

it('should open modal drawing if button `click to draw` clicked', async () => {
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile />',
  })

  const draw = screen.queryByTestId('signature-draw-mobile')
  const open = screen.queryByText('Click to Draw')

  expect(draw).toBeInTheDocument()
  expect(open).toBeInTheDocument()

  await fireEvent.click(open)

  const modal      = screen.queryByTestId('signature-draw-modal')
  const drawCanvas = screen.queryByTestId('signature-draw-desktop')

  expect(modal).toBeInTheDocument()
  expect(drawCanvas).toBeInTheDocument()
})

it('should go to rotate mode if screen width too small', async () => {
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile :width="430" />',
  })

  const draw = screen.queryByTestId('signature-draw-mobile')
  const open = screen.queryByText('Click to Draw')

  setWindow(400, 800)
  await nextTick()

  expect(draw).toBeInTheDocument()
  expect(draw).toHaveClass('signature-draw--rotate')
  expect(draw).not.toHaveClass('signature-draw--normal')

  await fireEvent.click(open)

  const desktop    = screen.queryByTestId('signature-draw-desktop')
  const drawCanvas = screen.queryByTestId('signature-draw-canvas')

  expect(desktop).toHaveClass('signature-draw--rotate')
  expect(drawCanvas).toHaveAttribute('width', '230')
  expect(drawCanvas).toHaveAttribute('height', '430')
})

it('should go as is screen width is enought', async () => {
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile :width="430" />',
  })

  const draw = screen.queryByTestId('signature-draw-mobile')
  const open = screen.queryByText('Click to Draw')

  setWindow(800, 400)
  await nextTick()

  expect(draw).toBeInTheDocument()
  expect(draw).not.toHaveClass('signature-draw--rotate')
  expect(draw).toHaveClass('signature-draw--normal')

  await fireEvent.click(open)

  const desktop    = screen.queryByTestId('signature-draw-desktop')
  const drawCanvas = screen.queryByTestId('signature-draw-canvas')

  expect(desktop).toHaveClass('signature-draw--normal')
  expect(drawCanvas).toHaveAttribute('width', '430')
  expect(drawCanvas).toHaveAttribute('height', '230')
})

it('should disabled window scroll when modal opened, remove it when closed', async () => {
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile />',
  })

  const draw = screen.queryByTestId('signature-draw-mobile')
  const open = screen.queryByText('Click to Draw')

  expect(draw).toBeInTheDocument()
  expect(open).toBeInTheDocument()

  await fireEvent.click(open)

  expect(document.body).toHaveStyle({ 'overflow-y': 'hidden' })

  const close = screen.queryByText('Save')

  await fireEvent.click(close)

  expect(document.body).not.toHaveStyle({ 'overflow-y': 'hidden' })
})

it('should modify state in v-model', async () => {
  const model  = ref('')
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile v-model="model" />',
    setup () {
      return { model }
    },
  })

  const draw = screen.queryByTestId('signature-draw-mobile')
  const open = screen.queryByText('Click to Draw')

  expect(draw).toBeInTheDocument()
  expect(open).toBeInTheDocument()

  await fireEvent.click(open)

  triggerDraw()
  await nextTick()

  const save = screen.queryByTestId('signature-draw-close')

  await fireEvent.click(save)

  expect(model.value).toStartWith('data:image/png')
})
