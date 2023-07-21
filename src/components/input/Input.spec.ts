import pInput from './Input.vue'
import pInputGroup from '../input-group/InputGroup.vue'
import IconEmail from '@privyid/persona-icon/vue/email/20.vue'
import { fireEvent, render } from '@testing-library/vue'
import { ref } from 'vue-demi'
import userEvent from '@testing-library/user-event'

it('should render properly without any prop', () => {
  const screen = render({
    components: { pInput },
    template  : '<p-input />',
  })

  const input = screen.queryByTestId('input')

  expect(input).toBeInTheDocument()
})

it('should able to change size using prop `size`', () => {
  const screen = render({
    components: { pInput },
    template  : '<p-input size="sm" />',
  })

  const input = screen.queryByTestId('input')

  expect(input).toHaveClass('input--sm')
  expect(input).not.toHaveClass('input--md')
})

it('should has disabled state if prop `disabled` set to true', () => {
  const screen = render({
    components: { pInput },
    template  : '<p-input disabled />',
  })

  const input = screen.queryByTestId('input')

  expect(input).toHaveClass('input--disabled')
  expect(input).toBeDisabled()
})

it('should has readonly state if prop `readonly` set to true', () => {
  const screen = render({
    components: { pInput },
    template  : '<p-input readonly />',
  })

  const input = screen.queryByTestId('input')

  expect(input).toHaveClass('input--readonly')
  expect(input).toHaveAttribute('readonly')
})

it('should has error state if prop `error` set to true', () => {
  const screen = render({
    components: { pInput },
    template  : '<p-input error />',
  })

  const input = screen.queryByTestId('input')

  expect(input).toHaveClass('input--error', 'state--error')
})

it('should has show clear button if prop `clearable` was provided', async () => {
  const screen = render({
    components: { pInput },
    template  : '<p-input clearable />',
  })

  const input    = screen.queryByTestId('input')
  const clearBtn = screen.queryByTestId('input-clear')

  expect(input).toHaveClass('input--clearable')
  expect(clearBtn).toBeInTheDocument()
  expect(clearBtn).not.toBeVisible()

  await fireEvent.update(input, 'Hello')

  expect(clearBtn).toBeVisible()
})

it('should able binding value using v-model', async () => {
  const model  = ref('')
  const screen = render({
    components: { pInput },
    template  : '<p-input v-model="model" />',
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('input')

  await fireEvent.update(input, 'Hello World')

  expect(model.value).toBe('Hello World')
})

it('should clear value in v-model if clear button clicked', async () => {
  const model  = ref('Hello World')
  const screen = render({
    components: { pInput },
    template  : '<p-input v-model="model" clearable />',
    setup () {
      return { model }
    },
  })

  const clearBtn = screen.queryByTestId('input-clear')

  await fireEvent.click(clearBtn)

  expect(model.value).toBe('')
})

it('should automatically add size of input via `size` props of input-group', () => {
  const screen = render({
    components: { pInputGroup, pInput },
    template  : `
      <p-input-group size="lg">
        <p-input />
      </p-input-group>
    `,
  })

  const inputGroup = screen.queryByTestId('input-group')
  const input      = screen.queryByTestId('input')

  expect(inputGroup).toBeInTheDocument()
  expect(input).toHaveClass('input--lg')
})

it('should able to add input prepend via `prepend` slots', () => {
  const screen = render({
    components: { pInput, IconEmail },
    template  : `
      <p-input>
        <template #prepend>
          <IconEmail />
        </template>
      </p-input>
    `,
  })

  const input = screen.queryByTestId('input')
  expect(input).toHaveClass('input--has-prepend')
})

it('should able to add input append via `append` slots', () => {
  const screen = render({
    components: { pInput, IconEmail },
    template  : `
      <p-input>
        <template #append>
          <IconEmail />
        </template>
      </p-input>
    `,
  })

  const input = screen.queryByTestId('input')
  expect(input).toHaveClass('input--has-append')
})

it('should able to add input-container class via `container-class` props', () => {
  const screen = render({
    components: { pInput },
    template  : `
      <p-input container-class="custom-class" />
    `,
  })

  const container = screen.queryByTestId('input-container')
  expect(container).toHaveClass('custom-class')
})

it('should able to filter inputted character if prop `accept` was provided', async () => {
  const model  = ref('')
  const screen = render({
    components: { pInput },
    template  : '<p-input v-model="model" accept="num" />',
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('input')
  const user  = userEvent.setup()

  await user.type(input, 'Hello World 123456')

  expect(model.value).toBe('123456')
})
