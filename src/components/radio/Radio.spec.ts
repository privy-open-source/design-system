import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { ref } from 'vue-demi'
import Radio from './Radio.vue'

it('should render properly without any prop', () => {
  const screen = render({
    components: { Radio },
    template  : `
      <Radio />
    `,
  })

  const radio = screen.getByTestId('radio')

  expect(radio).toBeInTheDocument()
  expect(radio).toHaveClass('radio', 'radio--radio')
})

it('should checked at start if `checked` props is provided', () => {
  const screen = render({
    components: { Radio },
    template  : `
      <Radio checked />
    `,
  })

  const radio = screen.getByTestId('radio')

  expect(radio).toBeInTheDocument()
  expect(radio).toHaveClass('radio--checked')
})

it('should have readonly style if `readonly` props is provided', () => {
  const screen = render({
    components: { Radio },
    template  : `
      <Radio readonly />
    `,
  })

  const radio = screen.getByTestId('radio')

  expect(radio).toBeInTheDocument()
  expect(radio).toHaveClass('radio--readonly')
})

it('should have disabled style if `disabled` props is provided', () => {
  const screen = render({
    components: { Radio },
    template  : `
      <Radio disabled />
    `,
  })

  const radio = screen.getByTestId('radio')

  expect(radio).toBeInTheDocument()
  expect(radio).toHaveClass('radio--disabled')
})

it('should have style checkbox if `apperance` set to "checkbox"', () => {
  const screen = render({
    components: { Radio },
    template  : `
      <Radio apperance="checkbox" />
    `,
  })

  const radio = screen.getByTestId('radio')

  expect(radio).toBeInTheDocument()
  expect(radio).toHaveClass('radio--checkbox')
  expect(radio).not.toHaveClass('radio--radio')
})

it('should modify state in v-model', async () => {
  const model  = ref()
  const screen = render({
    components: { Radio },
    template  : `
      <Radio v-model="model" value="apple">Apple</Radio>
      <Radio v-model="model" value="grape">Grape</Radio>
    `,
    setup () {
      return { model }
    },
  })

  const radioApple = screen.queryByText('Apple')
  const radioGrape = screen.queryByText('Grape')

  await fireEvent.click(radioApple)

  expect(model.value).toBe('apple')

  await fireEvent.click(radioGrape)

  expect(model.value).toBe('grape')
})

it('should trigger event "change" when clicked', async () => {
  const onChange = vi.fn()
  const screen   = render({
    components: { Radio },
    template  : `
      <Radio @change="onChange">
        Apple
      </Radio>
    `,
    setup () {
      return { onChange }
    },
  })

  const radioApple = screen.queryByText('Apple')

  await fireEvent.click(radioApple)

  expect(onChange).toBeCalledWith(true)
})
