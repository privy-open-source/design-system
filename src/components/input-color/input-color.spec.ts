import pInputColor from './inputColor.vue'
import { fireEvent, render } from '@testing-library/vue'
import { ref } from 'vue-demi'

it('should render properly without any prop', () => {
  const screen = render({
    components: { pInputColor },
    template  : '<p-input-color />',
  })

  const input = screen.queryByTestId('input-color')
  expect(input).toBeInTheDocument()
})

it('should be able to change style variant using `variant` prop', () => {
  const screen = render({
    components: { pInputColor },
    template  : '<p-input-color variant="circle" />',
  })

  const input = screen.queryByTestId('input-color')
  expect(input).toHaveClass('input-color--circle')
  expect(input).not.toHaveClass('input-color--default')
})

it('should has disabled state if prop `disabled` set to true', () => {
  const screen = render({
    components: { pInputColor },
    template  : '<p-input-color disabled />',
  })

  const input     = screen.queryByTestId('input-color')
  const inputForm = screen.queryByTestId('input-color-form')

  expect(input).toHaveClass('input-color--disabled')
  expect(inputForm).toBeDisabled()
  expect(inputForm).toHaveAttribute('disabled')
})

it('should has error state if prop `error` set to true', () => {
  const screen = render({
    components: { pInputColor },
    template  : '<p-input-color error />',
  })

  const input     = screen.queryByTestId('input-color')
  const inputForm = screen.queryByTestId('input-color-form')

  expect(input).toHaveClass('input-color--error')
  expect(inputForm).toHaveClass('input-color__form--error', 'state--error')
})

it('should has clear button when prop `clearable` was provided', async () => {
  const model  = ref('#5846e2')
  const screen = render({
    components: { pInputColor },
    template  : '<p-input-color v-model="model" clearable />',
    setup () {
      return { model }
    },
  })

  const input      = screen.queryByTestId('input-color')
  const inputForm  = screen.queryByTestId('input-color-form')
  const inputClear = screen.queryByTestId('input-color-clear')

  expect(input).toHaveClass('input-color--selected')
  expect(inputForm).toHaveClass('input-color__form--clearable', 'input-color__form')
  expect(inputClear).toBeInTheDocument()

  await fireEvent.click(inputClear)

  expect(model.value).toBe('')
})

it('should be able to make custom class via `container-class` prop', async () => {
  const model  = ref('')
  const screen = render({
    components: { pInputColor },
    template  : '<p-input-color v-model="model" container-class="custom-class" />',
    setup () {
      return { model }
    },
  })

  const input     = screen.queryByTestId('input-color')
  const inputForm = screen.queryByTestId('input-color-form')

  expect(input).toHaveClass('input-color', 'custom-class', 'input-color--default')
  expect(input).not.toHaveClass('input-color--selected')

  await fireEvent.update(inputForm, '#5846e2')

  expect(input).toHaveClass('input-color--selected')

  expect(model.value).toBe('#5846e2')
})
