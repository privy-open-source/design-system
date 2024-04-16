import { render } from '@testing-library/vue'
import * as canvas from '../signature-draw/__mocks__/canvas'
import pQrcode from './Qrcode.vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import QRCodeStyling from 'qr-code-styling'
import { nextTick, ref } from 'vue-demi'
import type * as VueUse from '@vueuse/core'
import type * as VueDemi from 'vue-demi'

const qrRender = vi.spyOn(QRCodeStyling.prototype, 'update')

vi.mock('../signature-draw/utils/canvas.ts', () => canvas)

vi.mock('@vueuse/core', async () => {
  const vueuse  = await vi.importActual('@vueuse/core')
  const vueDemi = await vi.importActual('vue-demi')

  return {
    ...vueuse as typeof VueUse,
    watchDebounced: (vueDemi as typeof VueDemi).watch,
  }
})

beforeEach(() => {
  vi.spyOn(window.URL, 'createObjectURL')
    .mockImplementation((file: File) => {
      return `blob://${file.name}`
    })

  vi.spyOn(QRCodeStyling.prototype, '_getElement')
    .mockReturnValue(Promise.resolve(document.createElement('canvas')))
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly', async () => {
  const screen = render({
    components: { pQrcode },
    template  : `
      <pQrcode data="hello world" />
    `,
  })

  const qr = screen.queryByTestId('qrcode')

  await delay(1)

  expect(qr).toBeInTheDocument()
  expect(qrRender).toBeCalledTimes(1)
})

it('should re-render if prop changes', async () => {
  const variant = ref('square')
  const screen  = render({
    components: { pQrcode },
    template  : `
      <pQrcode data="hello world" :variant="variant" />
    `,
    setup () {
      return { variant }
    },
  })

  const qr = screen.queryByTestId('qrcode')

  await delay(1)

  expect(qr).toBeInTheDocument()
  expect(qrRender).toBeCalledTimes(1)

  variant.value = 'dots'
  await nextTick()
  await delay(1)

  expect(qrRender).toBeCalledTimes(2)
})

it('should able to bind the result value using v-model', async () => {
  const model  = ref()
  const screen = render({
    components: { pQrcode },
    template  : `
      <pQrcode v-model="model" data="hello world" />
    `,
    setup () {
      return { model }
    },
  })

  const qr = screen.queryByTestId('qrcode')

  await delay(1)

  expect(qr).toBeInTheDocument()
  expect(model.value).toBeInstanceOf(File)
})

it('should able to bind the result in base-64 value using v-model with modifier `.base64`', async () => {
  const model  = ref()
  const screen = render({
    components: { pQrcode },
    template  : `
      <pQrcode v-model.base64="model" data="hello world" />
    `,
    setup () {
      return { model }
    },
  })

  const qr = screen.queryByTestId('qrcode')

  await delay(1)

  expect(qr).toBeInTheDocument()
  expect(model.value).not.toBeInstanceOf(File)
  expect(model.value).toStartWith('data:image/png;base64,')
})
