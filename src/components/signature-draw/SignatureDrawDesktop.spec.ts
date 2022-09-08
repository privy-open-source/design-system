import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { useDraw, triggerDraw } from './__mocks__/use-draw'
import * as canvas from './__mocks__/canvas'
import SignatureDrawDesktop from './SignatureDrawDesktop.vue'
import { nextTick, ref } from 'vue-demi'

vi.mock('./utils/use-draw.ts', () => ({ default: useDraw }))

vi.mock('./utils/canvas.ts', () => canvas)

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly', () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop />',
  })

  const draw = screen.queryByTestId('signature-draw-desktop')

  expect(draw).toBeInTheDocument()
})

it('should change canvas width if prop `width` is provided', () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop :width="400" />',
  })

  const canvas = screen.queryByTestId('signature-draw-canvas')

  expect(canvas).toBeInTheDocument()
  expect(canvas).toHaveAttribute('width', '400')
})

it('should change canvas height if prop `height` is provided', () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop :height="400" />',
  })

  const canvas = screen.queryByTestId('signature-draw-canvas')

  expect(canvas).toBeInTheDocument()
  expect(canvas).toHaveAttribute('height', '400')
})

it('should showing placeholder if prop `placeholder` is provided', () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop placeholder="Please Draw Here" />',
  })

  const placeholder = screen.queryByText('Please Draw Here')

  expect(placeholder).toBeInTheDocument()
})

it('should hide placeholder if canvas not blank', async () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop placeholder="Please Draw Here" />',
  })

  triggerDraw()
  await nextTick()

  const placeholder = screen.queryByText('Please Draw Here')

  expect(placeholder).not.toBeInTheDocument()
})

it('should draw line if user draw over canvas', () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop />',
  })

  const draw = screen.queryByTestId('signature-draw-desktop')

  triggerDraw()

  expect(draw).toBeInTheDocument()
  expect(canvas.drawLine).toBeCalled()
})

it('should draw line with color if `color` prop is provided', () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop color="#398A87" />',
  })

  const drawCanvas = screen.queryByTestId('signature-draw-canvas')

  triggerDraw()

  expect(drawCanvas).toBeInTheDocument()
  expect(canvas.drawLine).toBeCalledWith(drawCanvas, [
    0,
    0,
    3.686_666_666_666_666_5,
    3.686_666_666_666_666_5,
  ], { color: '#398A87' })
})

it('should replace existing drawn line if color changed', async () => {
  const color  = ref('#000000')
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop :color="color" />',
    setup () {
      return { color }
    },
  })

  const drawCanvas = screen.queryByTestId('signature-draw-canvas')

  triggerDraw()

  color.value = '#398A87'
  await nextTick()

  expect(drawCanvas).toBeInTheDocument()
  expect(canvas.replaceColor).toBeCalledWith(drawCanvas, '#398A87')
})

it('should reset and clear all the canvas if reset clicked', async () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop />',
  })

  triggerDraw()
  await nextTick()

  const reset = screen.queryByTestId('signature-draw-reset')

  expect(reset).toBeInTheDocument()

  await fireEvent.click(reset)

  expect(canvas.clearAll).toBeCalled()
  expect(reset).not.toBeInTheDocument()
})

it('should change reset button label if prop `resetLabel` is provided', async () => {
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop reset-label="Hapus"  />',
  })

  triggerDraw()
  await nextTick()

  const reset = screen.queryByTestId('signature-draw-reset')

  expect(reset).toBeInTheDocument()
  expect(reset).toHaveTextContent('Hapus')
})

it('should modify state in v-model', async () => {
  const model  = ref('')
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop v-model="model" />',
    setup () {
      return { model }
    },
  })

  triggerDraw()
  await nextTick()

  expect(model.value).toStartWith('data:image/png')

  const reset = screen.queryByTestId('signature-draw-reset')

  expect(reset).toBeInTheDocument()

  await fireEvent.click(reset)

  expect(model.value).toBe('')
})

it('should place the image if v-model data is provided', async () => {
  const model  = ref('data:image/png;base64,iVBORw0KGg...')
  const screen = render({
    components: { SignatureDrawDesktop },
    template  : '<SignatureDrawDesktop v-model="model" />',
    setup () {
      return { model }
    },
  })

  await nextTick()

  const drawCanvas = screen.queryByTestId('signature-draw-canvas')
  const reset      = screen.queryByTestId('signature-draw-reset')

  expect(reset).toBeInTheDocument()
  expect(canvas.placeImage).toBeCalledWith(drawCanvas, 'data:image/png;base64,iVBORw0KGg...')
})
