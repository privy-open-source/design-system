
import { render, fireEvent } from '@testing-library/vue'
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

  await fireEvent.update(inputs.at(0), '1')
  await fireEvent.update(inputs.at(1), '2')
  await fireEvent.update(inputs.at(2), '3')
  await fireEvent.update(inputs.at(3), '')
  await fireEvent.update(inputs.at(4), '3')

  expect(model.value).toBe('123 3')
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

  const inputs        = screen.queryAllByTestId('input')
  const clipboardData = { getData: vi.fn(() => '123456789') }

  await fireEvent.paste(inputs.at(0), { clipboardData })

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

  await fireEvent.keyUp(inputs.at(2), { key: 'Backspace' })

  expect(prevFocus).toBeCalled()
})

it('should select the input when focus', async () => {
  const screen = render({
    components: { InputPin },
    template  : '<input-pin />',
  })

  const inputs = screen.queryAllByTestId('input')
  const select = vi.spyOn(inputs.at(2) as HTMLInputElement, 'select')

  await fireEvent.focus(inputs.at(2))

  expect(select).toBeCalled()
})
