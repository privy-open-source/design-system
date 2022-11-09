import { render } from '@testing-library/vue'
import Dot from './Dot.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Dot },
    template  : `
      <Dot />
    `,
  })

  const dot = screen.queryByTestId('dot')

  expect(dot).toBeInTheDocument()
  expect(dot).toHaveClass('dot', 'dot--variant-default', 'dot--default')
})

it('should have style "success" if color props set to "success"', () => {
  const screen = render({
    components: { Dot },
    template  : `
      <Dot color="success" />
    `,
  })

  const dot = screen.queryByTestId('dot')

  expect(dot).toBeInTheDocument()
  expect(dot).toHaveClass('dot', 'dot--success')
  expect(dot).not.toHaveClass('dot--default')
})

it('should have style `pills` if variant props set to `pills`', () => {
  const screen = render({
    components: { Dot },
    template  : `
      <Dot variant="pills" />
    `,
  })

  const dot = screen.queryByTestId('dot')

  expect(dot).toBeInTheDocument()
  expect(dot).toHaveClass('dot', 'dot--variant-pills')
  expect(dot).not.toHaveClass('dot--variant-default')
})
