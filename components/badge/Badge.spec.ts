import { render } from '@testing-library/vue'
import Badge from './Badge.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Badge },
    template  : `
      <Badge>25</Badge>
    `,
  })

  const badge = screen.queryByTestId('badge')
  const text  = screen.queryByText('25')

  expect(badge).toBeInTheDocument()
  expect(badge).toHaveClass('badge', 'badge--default', 'badge--primary')
  expect(text).toBeInTheDocument()
})

it('should have style "success" if color props set to "success"', () => {
  const screen = render({
    components: { Badge },
    template  : `
      <Badge color="success">7K</Badge>
    `,
  })

  const badge = screen.queryByTestId('badge')
  const text  = screen.queryByText('7K')

  expect(badge).toBeInTheDocument()
  expect(badge).toHaveClass('badge', 'badge--success')
  expect(badge).not.toHaveClass('badge--primary')
  expect(text).toBeInTheDocument()
})

it('should have style "light" if variant props set to "light"', () => {
  const screen = render({
    components: { Badge },
    template  : `
      <Badge color="warning" variant="light">999+</Badge>
    `,
  })

  const badge = screen.queryByTestId('badge')
  const text  = screen.queryByText('999+')

  expect(badge).toBeInTheDocument()
  expect(badge).toHaveClass('badge', 'badge--warning', 'badge--light')
  expect(text).toBeInTheDocument()
})
