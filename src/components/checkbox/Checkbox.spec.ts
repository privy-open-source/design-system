import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { ref } from 'vue-demi'
import Checkbox from './Checkbox.vue'

it('should render properly without any prop', () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox />',
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(checkbox).toBeInTheDocument()
  expect(checkbox).toHaveClass('checkbox')
})

it('should have style disabled if prop `disabled` is provided', () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox disabled />',
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(checkbox).toBeInTheDocument()
  expect(checkbox).toHaveClass('checkbox--disabled')
})

it('should have style readonly if prop `readonly` is provided', () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox readonly />',
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(checkbox).toBeInTheDocument()
  expect(checkbox).toHaveClass('checkbox--readonly')
})

it('should have style interdeminate if prop `indeterminate` is provided', () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox indeterminate />',
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(checkbox).toBeInTheDocument()
  expect(checkbox).toHaveClass('checkbox--indeterminate')
})

it('should checked at start if prop `checked` is provided', () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox checked />',
  })

  const toggle = screen.queryByTestId('checkbox')

  expect(toggle).toHaveClass('checkbox--checked')
})

it('should toggle the state if checkbox is clicked', async () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox />',
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(checkbox).not.toHaveClass('checkbox--checked')

  await fireEvent.click(checkbox)

  expect(checkbox).toHaveClass('checkbox--checked')

  await fireEvent.click(checkbox)

  expect(checkbox).not.toHaveClass('checkbox--checked')
})

it('should not toggle the state if disabled', async () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox disabled />',
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(checkbox).not.toHaveClass('checkbox--checked')

  await fireEvent.click(checkbox)

  expect(checkbox).not.toHaveClass('checkbox--checked')
})

it('should not toggle the state if readonly', async () => {
  const screen = render({
    components: { Checkbox },
    template  : '<Checkbox readonly />',
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(checkbox).not.toHaveClass('checkbox--checked')

  await fireEvent.click(checkbox)

  expect(checkbox).not.toHaveClass('checkbox--checked')
})

it('should modify state in v-model', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Checkbox },
    template  : `
      <Checkbox v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const checkbox = screen.queryByTestId('checkbox')

  expect(model.value).toBe(false)

  await fireEvent.click(checkbox)

  expect(model.value).toBe(true)
})

it('should use value in props `value` and `unchecked-value` instead of true/false', async () => {
  const model  = ref('')
  const screen = render({
    components: { Checkbox },
    template  : `
      <Checkbox
        v-model="model"
        value="On"
        unchecked-value="Off" />
    `,
    setup () {
      return { model }
    },
  })

  const toggle = screen.queryByTestId('checkbox')

  await fireEvent.click(toggle)

  expect(model.value).toBe('On')

  await fireEvent.click(toggle)

  expect(model.value).toBe('Off')
})

it('should append value if v-model is an array', async () => {
  const model  = ref([])
  const screen = render({
    components: { Checkbox },
    template  : `
      <Checkbox v-model="model" value="apple">Apple</Checkbox>
      <Checkbox v-model="model" value="grape">Grape</Checkbox>
      <Checkbox v-model="model" value="pineapple">Pineapple</Checkbox>
    `,
    setup () {
      return { model }
    },
  })

  expect(model.value).toStrictEqual([])

  const checkboxApple    = screen.queryByText('Apple')
  const checkboxGrape    = screen.queryByText('Grape')
  const checkboxPineaple = screen.queryByText('Pineapple')

  await fireEvent.click(checkboxApple)
  await fireEvent.click(checkboxGrape)
  await fireEvent.click(checkboxPineaple)

  expect(model.value).toStrictEqual([
    'apple',
    'grape',
    'pineapple',
  ])
})

it('should remove value from array if it is clicked again', async () => {
  const model  = ref([
    'apple',
    'grape',
    'pineapple',
  ])
  const screen = render({
    components: { Checkbox },
    template  : `
      <Checkbox v-model="model" value="apple" data-testid="apple">Apple</Checkbox>
      <Checkbox v-model="model" value="grape">Grape</Checkbox>
      <Checkbox v-model="model" value="pineapple">Pineapple</Checkbox>
    `,
    setup () {
      return { model }
    },
  })

  const checkboxApple = screen.queryByTestId('apple')

  expect(checkboxApple).toHaveClass('checkbox--checked')

  await fireEvent.click(checkboxApple)

  expect(model.value).toStrictEqual(['grape', 'pineapple'])
})

it('should trigger event "change", when clicked', async () => {
  const onChange = vi.fn()
  const screen   = render({
    components: { Checkbox },
    template  : `
      <Checkbox @change="onChange">Apple</Checkbox>
    `,
    setup () {
      return { onChange }
    },
  })

  const checkbox = screen.queryByTestId('checkbox')

  await fireEvent.click(checkbox)

  expect(onChange).toBeCalledWith(true)

  await fireEvent.click(checkbox)

  expect(onChange).toBeCalledWith(false)
})
