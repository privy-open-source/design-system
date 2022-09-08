import { vi } from 'vitest'
import { render } from '@testing-library/vue'
import generate from './__mocks__/generate-text'
import SignatureText from './SignatureText.vue'
import { nextTick, ref } from 'vue-demi'
import { delay } from 'nanodelay'

vi.mock('./utils/generate-text.ts', () => {
  return { default: generate }
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly', () => {
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText />',
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledWith({
    text  : '- No Image -',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })
})

it('should render based on prop text', () => {
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" />',
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })
})

it('should change width if prop `width` was provided', () => {
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" :width="230" />',
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 230,
    height: 230,
    color : '#000000',
  })
})

it('should change height if prop `height` was provided', () => {
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" :height="500" />',
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 500,
    color : '#000000',
  })
})

it('should change font if prop `font` was provided', () => {
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" font="DM Sans" />',
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'DM Sans',
    width : 430,
    height: 230,
    color : '#000000',
  })
})

it('should change color if prop `color` was provided', () => {
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" color="#123456" />',
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#123456',
  })
})

it('should limit text following `limit`\'s prop', () => {
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum dolor" :limit="1" />',
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledWith({
    text  : 'Lorem',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })
})

it('should passing result data-uri to v-model', async () => {
  const model  = ref('')
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText v-model="model" />',
    setup () {
      return { model }
    },
  })

  const signature = screen.queryByTestId('signature-text')

  await delay(0)

  expect(signature).toBeInTheDocument()
  expect(model.value).toBe('data:image/png;base64,dataSample123456789')
})

it('should re-render if `text` changed', async () => {
  const text   = ref('lorem ipsum')
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText :text="text" />',
    setup () { return { text } },
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledTimes(1)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })

  text.value = 'ipsum lorem'
  await nextTick()

  expect(generate).toBeCalledTimes(2)
  expect(generate).toBeCalledWith({
    text  : 'Ipsum Lorem',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })
})

it('should re-render if `width` changed', async () => {
  const width  = ref(430)
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" :width="width" />',
    setup () { return { width } },
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledTimes(1)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })

  width.value = 500
  await nextTick()

  expect(generate).toBeCalledTimes(2)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 500,
    height: 230,
    color : '#000000',
  })
})

it('should re-render if `width` changed', async () => {
  const height = ref(230)
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" :height="height" />',
    setup () { return { height } },
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledTimes(1)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })

  height.value = 500
  await nextTick()

  expect(generate).toBeCalledTimes(2)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 500,
    color : '#000000',
  })
})

it('should re-render if `font` changed', async () => {
  const font   = ref('Herr Von Muellerhoff')
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" :font="font" />',
    setup () { return { font } },
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledTimes(1)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })

  font.value = 'DM Sans'
  await nextTick()

  expect(generate).toBeCalledTimes(2)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'DM Sans',
    width : 430,
    height: 230,
    color : '#000000',
  })
})

it('should re-render if `color` changed', async () => {
  const color  = ref('#000000')
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum" :color="color" />',
    setup () { return { color } },
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledTimes(1)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })

  color.value = '#123456'
  await nextTick()

  expect(generate).toBeCalledTimes(2)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#123456',
  })
})

it('should re-render if `limit` changed', async () => {
  const limit  = ref(3)
  const screen = render({
    components: { SignatureText },
    template  : '<SignatureText text="lorem ipsum dolor" :limit="limit" />',
    setup () { return { limit } },
  })

  const signature = screen.queryByTestId('signature-text')

  expect(signature).toBeInTheDocument()
  expect(generate).toBeCalledTimes(1)
  expect(generate).toBeCalledWith({
    text  : 'Lorem Ipsum Dolor',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })

  limit.value = 1
  await nextTick()

  expect(generate).toBeCalledTimes(2)
  expect(generate).toBeCalledWith({
    text  : 'Lorem',
    font  : 'Herr Von Muellerhoff',
    width : 430,
    height: 230,
    color : '#000000',
  })
})
