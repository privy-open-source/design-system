import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { takePicture } from './__mocks__/take-picture'
import {
  usePermission,
  useDevicesList,
  useUserMedia,
  cameraOn,
  setPermission,
} from './__mocks__/user-media'
import * as dialog from './__mocks__/use-dialog'
import type * as VueUse from '@vueuse/core'
import { defineAdapter } from './adapter/adapter'
import { delay } from 'nanodelay'
import { until } from '@vueuse/core'
import { nextTick, ref } from 'vue-demi'
import Camera from './Camera.vue'

vi.mock('./utils/take-picture.ts', () => {
  return { takePicture }
})

vi.mock('@vueuse/core', async () => {
  const vueuse = await vi.importActual('@vueuse/core')

  return {
    ...vueuse as typeof VueUse,
    usePermission,
    useDevicesList,
    useUserMedia,
  }
})

vi.mock('../dialog', () => dialog)

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly', () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera />',
  })

  const camera = screen.queryByTestId('camera')

  expect(camera).toBeInTheDocument()
})

it('should showing camera off when camera not initialized', () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera />',
  })

  const cameraOff = screen.queryByTestId('camera-off')
  const turnOn    = screen.queryByTestId('camera-turn-on')

  expect(cameraOff).toBeInTheDocument()
  expect(turnOn).toBeInTheDocument()
})

it('should showing video when camera is ready', async () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera />',
  })

  const turnOn = screen.queryByTestId('camera-turn-on')

  await fireEvent.click(turnOn)

  const video     = screen.queryByTestId('camera-video')
  const cameraOff = screen.queryByTestId('camera-off')

  expect(video).toBeInTheDocument()
  expect(cameraOff).not.toBeInTheDocument()
})

it('should able to take picture and show result if action button is clicked', async () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera />',
  })

  await cameraOn()

  const takeBtn = screen.queryByTestId('camera-take')

  await fireEvent.click(takeBtn)

  const result = screen.queryByTestId('camera-result')
  const retake = screen.queryByTestId('camera-retake')

  expect(result).toBeInTheDocument()
  expect(retake).toBeInTheDocument()
})

it('should able to re-take picture after take result', async () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera />',
  })

  await cameraOn()

  const takeBtn = screen.queryByTestId('camera-take')

  await fireEvent.click(takeBtn)

  const result = screen.queryByTestId('camera-result')
  const retake = screen.queryByTestId('camera-retake')

  expect(result).toBeInTheDocument()
  expect(retake).toBeInTheDocument()
  expect(takeBtn).not.toBeInTheDocument()

  await fireEvent.click(retake)

  const video = screen.queryByTestId('camera-video')

  expect(video).toBeInTheDocument()
  expect(result).not.toBeInTheDocument()
  expect(retake).not.toBeInTheDocument()
})

it('should have style mirror if prop `mirror` is provided', async () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera mirror />',
  })

  const camera = screen.queryByTestId('camera')

  expect(camera).toHaveClass('camera--mirror')
})

it('should have style mask if prop `mirror` is provided', async () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera mask="circle" />',
  })

  const camera = screen.queryByTestId('camera')

  expect(camera).toHaveClass('camera__mask--circle')
})

it('should able to change camera if device has more than 1 cameras', async () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera />',
  })

  const camera = screen.queryByTestId('camera')
  const toggle = screen.queryByTestId('camera-toggle')

  expect(toggle).toBeInTheDocument()
  expect(camera).toHaveAttribute('data-deviceid', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

  await fireEvent.click(toggle)

  expect(camera).toHaveAttribute('data-deviceid', 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
})

it("should auto capture if camera's adapter have meta autoStart: true", async () => {
  const isFinished  = ref(false)
  const mockAdapter = defineAdapter({
    meta: { autoStart: true },
    async run () {
      await until(isFinished).toBe(true)

      return {
        preview: takePicture(),
        result : takePicture(),
      }
    },
  })

  const screen = render({
    components: { Camera },
    template  : '<Camera :adapter="adapter" />',
    setup () {
      return { adapter: mockAdapter }
    },
  })

  await cameraOn()

  const video   = screen.queryByTestId('camera-video')
  const takeBtn = screen.queryByTestId('camera-take')

  // Simulate video play
  await fireEvent.play(video)

  expect(takeBtn).toBeInTheDocument()
  expect(takeBtn).toBeDisabled()

  isFinished.value = true
  await delay(0)

  const result = screen.queryByTestId('camera-result')
  const retake = screen.queryByTestId('camera-retake')

  expect(result).toBeInTheDocument()
  expect(retake).toBeInTheDocument()
})

it('should able to show toast with ref', async () => {
  const camera = ref<InstanceType<typeof Camera>>()
  const screen = render({
    components: { Camera },
    template  : '<Camera ref="camera" />',
    setup () {
      return { camera }
    },
  })

  await cameraOn()

  camera.value.toast('Hello World')
  await nextTick()

  const toast = screen.queryByTestId('camera-toast')

  expect(toast).toBeInTheDocument()
  expect(toast).toHaveTextContent('Hello World')
})

it('should able to show toast from adapter', async () => {
  const adapter = defineAdapter({
    run ({ toast }) {
      toast('Hello from adapter')

      return {
        preview: takePicture(),
        result : takePicture(),
      }
    },
  })

  const screen = render({
    components: { Camera },
    template  : '<Camera :adapter="adapter" />',
    setup () {
      return { adapter }
    },
  })

  await cameraOn()

  const takeBtn = screen.queryByTestId('camera-take')

  await fireEvent.click(takeBtn)

  const toast = screen.queryByTestId('camera-toast')

  expect(toast).toBeInTheDocument()
  expect(toast).toHaveTextContent('Hello from adapter')
})

it('should show popup dialog when user has no allow the camera yet', async () => {
  await setPermission('prompt')

  render({
    components: { Camera },
    template  : '<Camera />',
  })

  await delay(0)

  expect(dialog.alert).toBeCalledWith({
    title      : 'Camera Access Required',
    text       : 'Privy need to access your internal camera to process this journey',
    confirm    : { text: 'Ok' },
    footerAlign: 'end',
  })
})

it('should show popup dialog when user has block the camera yet', async () => {
  await setPermission('denied')

  render({
    components: { Camera },
    template  : '<Camera />',
  })

  await delay(0)

  expect(dialog.alert).toBeCalledWith({
    title      : 'Camera Access Blocked',
    text       : 'Privy need to access your internal camera to process this journey',
    confirm    : { text: 'Ok' },
    footerAlign: 'end',
  })
})
