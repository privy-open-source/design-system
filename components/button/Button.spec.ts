import '@testing-library/jest-dom'
import { render } from '@testing-library/vue'
import Button from './Button.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button>
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')
  const text   = screen.queryByText('Hello')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn', 'btn-primary')
  expect(text).toBeInTheDocument()
})

it('should has class "btn-secondary" if variant props set to "secondary"', () => {
  const screen = render({
    components: { Button },
    template  : `
      <Button variant="secondary">
        Hello
      </Button>
    `,
  })

  const button = screen.queryByTestId('btn')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn', 'btn-secondary')
  expect(button).not.toHaveClass('btn-primary')
})

