import { render, fireEvent } from '@testing-library/vue'
import { triggerDraw, useDraw } from './__mocks__/use-draw'
import * as canvas from './__mocks__/canvas'
import type * as VueUse from '@vueuse/core'
import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'
import { setWindow, useWindowSize } from './__mocks__/use-window-size'
import rotateImage from './__mocks__/rotate-image'
import SignatureDrawMobile from './SignatureDrawMobile.vue'
import { delay } from 'nanodelay'

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

beforeEach(() => {
  setWindow(375, 667)

  vi.spyOn(window.URL, 'createObjectURL')
    .mockImplementation((file: File) => {
      return `blob://${file.name}`
    })
})

afterEach(() => {
  vi.restoreAllMocks()
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
  await delay(0)

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
  await delay(0)

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
    template  : '<SignatureDrawMobile v-model.base64="model" />',
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

  const save  = screen.queryByTestId('signature-draw-close')
  const modal = screen.queryByTestId('signature-draw-modal')

  await fireEvent.click(save)
  await delay(1)

  expect(model.value).toStartWith('data:image/png')
  expect(modal).not.toBeInTheDocument()
})

it('should show preview of sign instead of button, if user has drawn', () => {
  const model  = ref('data:image/png;base64,123456789')
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile v-model="model" />',
    setup () {
      return { model }
    },
  })

  const preview = screen.queryByTestId('signature-draw-preview')

  expect(preview).toBeInTheDocument()
})

it('should open canvas if image preview is clicked', async () => {
  const model  = ref('data:image/png;base64,123456789')
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile v-model="model" />',
    setup () {
      return { model }
    },
  })

  const preview = screen.queryByTestId('signature-draw-preview')

  await fireEvent.click(preview)
  await delay(1)

  const modal = screen.queryByTestId('signature-draw-modal')

  expect(modal).toBeInTheDocument()
})

it('should open canvas if edit button is clicked', async () => {
  const model  = ref('data:image/png;base64,123456789')
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile v-model="model" />',
    setup () {
      return { model }
    },
  })

  const preview = screen.queryByTestId('signature-draw-edit')

  await fireEvent.click(preview)
  await delay(1)

  const modal = screen.queryByTestId('signature-draw-modal')

  expect(modal).toBeInTheDocument()
})

it('should change draw button label if `openDrawLabel` prop is provided', () => {
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile open-draw-label="Open" />',
  })

  const open = screen.queryByTestId('signature-draw-open')

  expect(open).toBeInTheDocument()
  expect(open).toHaveTextContent('Open')
})

it('should change save button label if `closeDrawLabel` prop is provided', async () => {
  const screen = render({
    components: { SignatureDrawMobile },
    template  : '<SignatureDrawMobile close-draw-label="Simpan" />',
  })

  const open = screen.queryByTestId('signature-draw-open')

  await fireEvent.click(open)
  await delay(1)

  const close = screen.queryByTestId('signature-draw-close')

  expect(close).toBeInTheDocument()
  expect(close).toHaveTextContent('Simpan')
})
