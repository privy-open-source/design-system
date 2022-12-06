import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { cropImage } from './__mocks__/crop-image'
import {
  triggerDrag,
  triggerPinch,
  usePinch,
} from './__mocks__/use-pinch'
import Cropper from './Cropper.vue'
import img from './assets/sample-1.jpg'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { delay } from 'nanodelay'
import { nextTick, ref } from 'vue-demi'
import { createSpinner } from '../avatar/utils/create-image'

// eslint-disable-next-line unicorn/prefer-module
const blob = readFileSync(resolve(__dirname, './assets/sample-1.jpg'))
const file = new globalThis.File([blob], 'image.jpg', { type: 'image/jpeg' })

vi.mock('./utils/crop-image.ts', () => ({ cropImage }))

vi.mock('./utils/use-pinch.ts', () => ({ usePinch }))

vi.mock('../input-range/utils/use-drag.ts', () => ({ default: vi.fn() }))

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly', () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const cropper = screen.getByTestId('cropper')

  expect(cropper).toBeInTheDocument()
})

it('should able to zoomOut if button zoomOut clicked', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const zoomOut = screen.getByTestId('cropper-zoom-out')
  const preview = screen.getByTestId('cropper-preview')

  await fireEvent.click(zoomOut)

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(0px, 0px) scale(0.9)' })
})

it('should able to zoomIn if button zoomIn clicked', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const zoomIn  = screen.getByTestId('cropper-zoom-in')
  const preview = screen.getByTestId('cropper-preview')

  await fireEvent.click(zoomIn)

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(0px, 0px) scale(1.1)' })
})

it('should able to rotate counter-clockwise if rotate left is clicked', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const rotateLeft = screen.getByTestId('cropper-rotate-left')
  const preview    = screen.getByTestId('cropper-preview')

  await fireEvent.click(rotateLeft)

  expect(preview).toHaveStyle({ transform: 'rotate(-90deg) translate(0px, 0px) scale(0.5)' })
})

it('should able to rotate clockwise if rotate right is clicked', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const rotateRight = screen.getByTestId('cropper-rotate-right')
  const preview     = screen.getByTestId('cropper-preview')

  await fireEvent.click(rotateRight)

  expect(preview).toHaveStyle({ transform: 'rotate(90deg) translate(0px, 0px) scale(0.5)' })
})

it('should able to reset all movement if reset button clicked', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const rotateRight = screen.getByTestId('cropper-rotate-right')
  const zoomIn      = screen.getByTestId('cropper-zoom-in')
  const reset       = screen.getByTestId('cropper-reset')
  const preview     = screen.getByTestId('cropper-preview')

  await fireEvent.click(rotateRight)
  await fireEvent.click(rotateRight)
  await fireEvent.click(zoomIn)
  await fireEvent.click(zoomIn)

  expect(preview).toHaveStyle({ transform: 'rotate(180deg) translate(0px, 0px) scale(0.7)' })

  await fireEvent.click(reset)

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(0px, 0px) scale(0.5)' })
})

it('should able to move position using drag', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const preview = screen.getByTestId('cropper-preview')

  await triggerDrag(100, 100)

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(100px, 100px) scale(1)' })
})

it('should able to move position and zoomIn/zoomOut using pinch', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const preview = screen.getByTestId('cropper-preview')

  await triggerPinch(1.5, -300, 100)

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(-300px, 100px) scale(1.5)' })
})

it('should able to zoomIn / zoomOut using mouse wheel', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const preview   = screen.getByTestId('cropper-preview')
  const container = screen.getByTestId('cropper-container')

  // Zoom in
  await fireEvent.wheel(container, { deltaY: 60 })

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(0px, 0px) scale(1.1)' })

  // Zoom out
  await fireEvent.wheel(container, { deltaY: -60 })
  await fireEvent.wheel(container, { deltaY: -60 })

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(0px, 0px) scale(0.9)' })
})

it('should able to move using keyboard arrow', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" />',
    setup () {
      return { img }
    },
  })

  const preview = screen.getByTestId('cropper-preview')

  await fireEvent.keyDown(preview, { key: 'ArrowUp' })

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(0px, -1px) scale(1)' })

  await fireEvent.keyDown(preview, { key: 'ArrowDown' })
  await fireEvent.keyDown(preview, { key: 'ArrowDown' })

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(0px, 1px) scale(1)' })

  await fireEvent.keyDown(preview, { key: 'ArrowLeft' })

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(-1px, 1px) scale(1)' })

  await fireEvent.keyDown(preview, { key: 'ArrowRight' })
  await fireEvent.keyDown(preview, { key: 'ArrowRight' })

  expect(preview).toHaveStyle({ transform: 'rotate(0deg) translate(1px, 1px) scale(1)' })
})

it('should able to use File object as image source', async () => {
  vi.spyOn(window.URL, 'createObjectURL')
    .mockImplementation((file: File) => {
      return `blob://${file.name}`
    })

  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="file" />',
    setup () {
      return { file }
    },
  })

  await delay(0)

  const preview = screen.getByTestId('cropper-preview')

  expect(preview).toHaveAttribute('src', 'blob://image.jpg')
})

it('should able to set crop width and height using prop width and height', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" width="500" height="200" />',
    setup () {
      return { img }
    },
  })

  const preview = screen.queryByTestId('cropper-preview')
  const mask    = screen.queryByTestId('cropper-mask')
  const canvas  = screen.queryByTestId('cropper-canvas')

  expect(mask).toHaveStyle({ width: '500px' })
  expect(mask.style.aspectRatio).toBe('2.5')

  await fireEvent.load(preview)

  expect(cropImage).toBeCalledWith({
    canvas : canvas,
    image  : preview,
    width  : 500,
    height : 200,
    x      : 0,
    y      : 0,
    angle  : 0,
    scale  : 0.5,
    rounded: false,
  })
})

it('should scale down the crop mask if crop width larger than viewport', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" width="500" height="200" />',
    setup () {
      return { img }
    },
  })

  const container = screen.queryByTestId('cropper-container')

  vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(300)

  const preview = screen.queryByTestId('cropper-preview')
  const canvas  = screen.queryByTestId('cropper-canvas')

  await fireEvent.load(preview)

  expect(cropImage).toBeCalledWith({
    canvas : canvas,
    image  : preview,
    width  : 500,
    height : 200,
    x      : 0,
    y      : 0,
    angle  : 0,
    scale  : 0.5 * (500 / (300 * 2 / 3)),
    rounded: false,
  })
})

it('should able to crop using ratio', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" :ratio="4/3" />',
    setup () {
      return { img }
    },
  })

  const container = screen.queryByTestId('cropper-container')

  vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(1000)

  const preview = screen.queryByTestId('cropper-preview')
  const canvas  = screen.queryByTestId('cropper-canvas')

  await fireEvent.load(preview)

  expect(cropImage).toBeCalledWith({
    canvas : canvas,
    image  : preview,
    width  : 1000 * 2 / 3,
    height : (1000 * 2 / 3) * (3 / 4),
    x      : 0,
    y      : 0,
    angle  : 0,
    scale  : 0.5,
    rounded: false,
  })
})

it('should crop rounded if prop `rounded` was provided', async () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" rounded />',
    setup () {
      return { img }
    },
  })

  const container = screen.queryByTestId('cropper-container')

  vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(600)

  const cropper = screen.queryByTestId('cropper')
  const preview = screen.queryByTestId('cropper-preview')
  const canvas  = screen.queryByTestId('cropper-canvas')

  await fireEvent.load(preview)

  expect(cropper).toHaveClass('cropper--rounded')
  expect(cropImage).toBeCalledWith({
    canvas : canvas,
    image  : preview,
    width  : 400,
    height : 400,
    x      : 0,
    y      : 0,
    angle  : 0,
    scale  : 0.5,
    rounded: true,
  })
})

it('should re-run the cropping process if image changed (drag, zoom, rotate)', async () => {
  vi.useFakeTimers()

  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" width="400" :ratio="4/3" />',
    setup () {
      return { img }
    },
  })

  const rotateRight = screen.getByTestId('cropper-rotate-right')
  const zoomIn      = screen.getByTestId('cropper-zoom-in')
  const canvas      = screen.queryByTestId('cropper-canvas')
  const preview     = screen.queryByTestId('cropper-preview')

  await fireEvent.load(preview)

  expect(cropImage).toBeCalledTimes(1)

  await fireEvent.click(rotateRight)
  await fireEvent.click(rotateRight)
  await fireEvent.click(zoomIn)
  await fireEvent.click(zoomIn)
  await triggerDrag(50, 50)

  vi.advanceTimersByTime(501)
  await nextTick()

  expect(cropImage).toBeCalledTimes(2)
  expect(cropImage).lastCalledWith({
    canvas : canvas,
    image  : preview,
    width  : 400,
    height : 300,
    x      : -49.999_999_999_999_99,
    y      : -50.000_000_000_000_01,
    angle  : 180,
    scale  : 0.7,
    rounded: false,
  })

  vi.useRealTimers()
})

it('should not re-run the cropping process if prop `no-autocrop` was provided', async () => {
  vi.useFakeTimers()

  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" no-autocrop />',
    setup () {
      return { img }
    },
  })

  const rotateRight = screen.getByTestId('cropper-rotate-right')
  const zoomIn      = screen.getByTestId('cropper-zoom-in')
  const preview     = screen.queryByTestId('cropper-preview')

  await fireEvent.load(preview)

  expect(cropImage).toBeCalledTimes(0)

  await fireEvent.click(rotateRight)
  await fireEvent.click(rotateRight)
  await fireEvent.click(zoomIn)
  await fireEvent.click(zoomIn)
  await triggerDrag(50, 50)

  vi.advanceTimersByTime(501)
  await nextTick()

  expect(cropImage).toBeCalledTimes(0)

  vi.useRealTimers()
})

it('should disabled crop mode if prop `no-crop` was provided', () => {
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" no-crop />',
    setup () {
      return { img }
    },
  })

  const cropper = screen.queryByTestId('cropper')
  const mask    = screen.queryByTestId('cropper-mask')

  expect(cropper).toHaveClass('cropper--no-crop')
  expect(mask).not.toBeInTheDocument()
})

it('should re-load the image if prop `src` was changed', async () => {
  vi.spyOn(window.URL, 'createObjectURL')
    .mockImplementation((file: File) => {
      return `blob://${file.name}`
    })

  const src    = ref<string | File>(img)
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="src" />',
    setup () {
      return { src }
    },
  })

  await delay(0)

  const preview = screen.queryByTestId('cropper-preview')

  expect(preview).toHaveAttribute('src', img)

  src.value = file
  await nextTick()

  expect(preview).toHaveAttribute('src', 'blob://image.jpg')

  src.value = undefined
  await nextTick()

  expect(preview).toHaveAttribute('src', createSpinner(512, 512))
})

it('should binding value in v-model', async () => {
  const result = ref()
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" v-model="result" />',
    setup () {
      return { img, result }
    },
  })

  const preview = screen.queryByTestId('cropper-preview')

  await fireEvent.load(preview)

  expect(result.value).toBeInstanceOf(File)
})

it('should convert value in v-model to base64 if modifier .base64 was provided', async () => {
  const result = ref()
  const screen = render({
    components: { Cropper },
    template  : '<Cropper :src="img" v-model.base64="result" />',
    setup () {
      return { img, result }
    },
  })

  const preview = screen.queryByTestId('cropper-preview')

  await fireEvent.load(preview)

  expect(result.value).toStartWith('data:image/png;base64')
})
