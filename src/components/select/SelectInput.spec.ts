import pInput from './SelectInput.vue'
import pInputGroup from '../input-group/InputGroup.vue'
import IconEmail from '@privyid/persona-icon/vue/email/20.vue'
import { render } from '@testing-library/vue'

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
  expect(input).toHaveAttribute('disabled', 'true')
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
