import pInputGroup from './InputGroup.vue'
import { render } from '@testing-library/vue'

it('should render properly without any prop', () => {
  const screen = render({
    components: { pInputGroup },
    template  : `
      <p-input-group />
    `,
  })

  const input = screen.queryByTestId('input-group')

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass('input-group')
})

it('should able to set size of input-group via `size` props', () => {
  const screen = render({
    components: { pInputGroup },
    template  : `
      <p-input-group size="sm" />
    `,
  })

  const input = screen.queryByTestId('input-group')

  expect(input).toHaveClass('input-group--sm')
})

it('should have disable state if prop `disabled` set to true', () => {
  const screen = render({
    components: { pInputGroup },
    template  : `
      <p-input-group disabled />
    `,
  })

  const input = screen.queryByTestId('input-group')

  expect(input).toHaveClass('input-group--disabled', 'state--disabled')
})

it('should have readonly state if prop `readonly` set to true', () => {
  const screen = render({
    components: { pInputGroup },
    template  : `
      <p-input-group readonly />
    `,
  })

  const input = screen.queryByTestId('input-group')

  expect(input).toHaveClass('input-group--readonly')
})

it('should have error state if prop `error` set to true', () => {
  const screen = render({
    components: { pInputGroup },
    template  : `
      <p-input-group error />
    `,
  })

  const input = screen.queryByTestId('input-group')

  expect(input).toHaveClass('input-group--error', 'state--error')
})
