
import { render, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import InputPin from './InputPin.vue'
import { ref } from 'vue-demi'
import { vi } from 'vitest'

const nextFocus = vi.fn()
const prevFocus = vi.fn()

vi.mock('../dropdown/utils/use-focus.ts', () => {
  function useFocus () {
    return {
      next: nextFocus,
      prev: prevFocus,
    }
  }

  return { useFocus }
})

it('should render properly', () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin />',
  })

  const input = screen.queryByTestId('input-pin')

  expect(input).toBeInTheDocument()
})

it('should have disabled state if prop disabled was provided', () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin disabled />',
  })

  const input = screen.queryByTestId('input-pin')

  expect(input).toHaveClass('input-pin--disabled')
})

it('should have readonly state if prop readonly was provided', () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin readonly />',
  })

  const input = screen.queryByTestId('input-pin')

  expect(input).toHaveClass('input-pin--readonly')
})

it('should have error state if prop error was provided', () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin error />',
  })

  const input = screen.queryByTestId('input-pin')

  expect(input).toHaveClass('input-pin--error')
})

it('should have number of input equal from prop length', () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin length="3" />',
  })

  const inputs = screen.queryAllByTestId('input')

  expect(inputs).toHaveLength(3)
})

it('should combine all value from all input into single v-model', async () => {
  const model  = ref('')
  const screen = render({
    components: { InputPin },
    template  : '<input-pin v-model="model" />',
    setup () {
      return { model }
    },
  })

  const inputs = screen.queryAllByTestId('input')
  const user   = userEvent.setup()

  await user.type(inputs.at(0), '1')
  await user.type(inputs.at(1), '2')
  await user.type(inputs.at(2), '3')
  await user.type(inputs.at(4), '3')

  expect(model.value).toBe('123 3')
})

it('should not trim space in begining of v-model result text', async () => {
  const model  = ref('')
  const screen = render({
    components: { InputPin },
    template  : '<input-pin v-model="model" />',
    setup () {
      return { model }
    },
  })

  const inputs = screen.queryAllByTestId('input')
  const user   = userEvent.setup()

  await user.type(inputs.at(2), '1')
  await user.type(inputs.at(3), '2')
  await user.type(inputs.at(4), '3')

  expect(model.value).toBe('  123')
})

it('should handle value from clipboard (paste)', async () => {
  const model  = ref('')
  const screen = render({
    components: { InputPin },
    template  : '<input-pin v-model="model" />',
    setup () {
      return { model }
    },
  })

  const inputs = screen.queryAllByTestId('input')

  await fireEvent(inputs.at(0), new InputEvent('beforeinput', { inputType: 'insertFromPaste', data: '123456789' }))

  expect(model.value).toBe('12345')
  expect(inputs.at(0)).toHaveValue('1')
  expect(inputs.at(1)).toHaveValue('2')
  expect(inputs.at(2)).toHaveValue('3')
  expect(inputs.at(3)).toHaveValue('4')
  expect(inputs.at(4)).toHaveValue('5')
})

it('should back to previous focus if delete the value', async () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin />',
  })

  const inputs = screen.queryAllByTestId('input')

  await fireEvent.keyDown(inputs.at(2), { key: 'Backspace' })

  expect(prevFocus).toBeCalled()
})

it('should have readonly attribute if prop readonly was provided', async () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin readonly />',
  })

  const inputs = screen.queryAllByTestId('input')
  expect(inputs[0]).toHaveAttribute('readonly')
})

it('should have readonly attribute if prop readonly was provided', () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin readonly />',
  })

  const inputs = screen.queryAllByTestId('input')
  expect(inputs[0]).toHaveAttribute('readonly')
})

it('should failed to typing if input have readonly properties', async () => {
  const model  = ref('')
  const screen = render({
    components: { InputPin },
    template  : '<input-pin readonly v-model="model"/>',
  })

  const inputs = screen.queryAllByTestId('input')
  const user   = userEvent.setup()

  await user.type(inputs.at(1), '1')
  await user.type(inputs.at(2), '1')
  await user.type(inputs.at(3), '2')
  await user.type(inputs.at(4), '3')

  expect(model.value).toBe('')
})

it('should failed to typing if input have disabled properties', async () => {
  const model  = ref('')
  const screen = render({
    components: { InputPin },
    template  : '<input-pin disabled v-model="model"/>',
  })

  const inputs = screen.queryAllByTestId('input')
  const user   = userEvent.setup()

  await user.type(inputs.at(1), '1')
  await user.type(inputs.at(2), '1')
  await user.type(inputs.at(3), '2')
  await user.type(inputs.at(4), '3')

  expect(model.value).toBe('')
})
