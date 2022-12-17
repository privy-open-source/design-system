import { fireEvent, render } from '@testing-library/vue'
import { nextTick, ref } from 'vue-demi'
import Textarea from './Textarea.vue'

Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
  configurable: true,
  get         : function () {
    const index = this.value.split('\n').length - 1

    return [
      '46',
      '69',
      '91',
      '114',
      '136',
    ].at(index)
  },
  set () {
    // Do nothing
  },
})

it('should render properly without prop', () => {
  const screen = render({
    components: { Textarea },
    template  : `
      <Textarea />
    `,
  })

  const textarea = screen.queryByTestId('textarea')

  expect(textarea).toBeInTheDocument()
})

it('should have style disabled if props `disabled` is provided', () => {
  const screen = render({
    components: { Textarea },
    template  : `
      <Textarea disabled />
    `,
  })

  const textarea = screen.queryByTestId('textarea')
  const input    = screen.queryByTestId('textarea-input')

  expect(textarea).toHaveClass('textarea', 'textarea--disabled')
  expect(input).toBeDisabled()
})

it('should have style readonly if props `readonly` is provided', () => {
  const screen = render({
    components: { Textarea },
    template  : `
      <Textarea readonly />
    `,
  })

  const textarea = screen.queryByTestId('textarea')
  const input    = screen.queryByTestId('textarea-input')

  expect(textarea).toHaveClass('textarea', 'textarea--readonly')
  expect(input).toHaveAttribute('readonly')
})

it('should have style error if props `error` is provided', () => {
  const screen = render({
    components: { Textarea },
    template  : `
      <Textarea error />
    `,
  })

  const textarea = screen.queryByTestId('textarea')

  expect(textarea).toHaveClass('textarea', 'textarea--error', 'state--error')
})

it('should enable resize if props `resize` is provided', () => {
  const screen = render({
    components: { Textarea },
    template  : `
      <Textarea resize />
    `,
  })

  const textarea = screen.queryByTestId('textarea')

  expect(textarea).toHaveClass('textarea', 'textarea--resize')
})

it('should be able height by content if prop `auto-grow` is provided', async () => {
  const screen = render({
    components: { Textarea },
    template  : `
      <Textarea auto-grow rows="1" />
    `,
  })

  const textarea = screen.queryByTestId('textarea')
  const input    = screen.queryByTestId('textarea-input')

  expect(textarea).toHaveClass('textarea', 'textarea--autogrow')

  await fireEvent.update(input, 'Hello World\nHello')

  expect(input).toHaveStyle({ height: '69px' })
})

it('should remove height if prop `auto-grow` set to false', async () => {
  const autoGrow = ref(true)
  const screen   = render({
    components: { Textarea },
    template  : `
      <Textarea :auto-grow="autoGrow" rows="1" />
    `,
    setup () {
      return { autoGrow }
    },
  })

  const textarea = screen.queryByTestId('textarea')
  const input    = screen.queryByTestId('textarea-input')

  expect(textarea).toHaveClass('textarea', 'textarea--autogrow')
  expect(input).toHaveStyle({ height: '46px' })

  autoGrow.value = false
  await nextTick()

  expect(textarea).not.toHaveClass('textarea--autogrow')
  expect(input).not.toHaveStyle({ height: '46px' })

  autoGrow.value = true
  await fireEvent.update(input, 'A\nB\nC')

  expect(input).toHaveStyle({ height: '91px' })
})

it('should modify value in v-model', async () => {
  const model  = ref('')
  const screen = render({
    components: { Textarea },
    template  : `
      <Textarea v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('textarea-input')

  await fireEvent.update(input, 'Hello\nWorld')

  expect(model.value).toBe('Hello\nWorld')
})
