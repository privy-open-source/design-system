import { render } from '@testing-library/vue'
import Button from './Button.vue'
import '@testing-library/jest-dom'

it('should render properly', async () => {
  const { getByTestId } = render(Button)
  const button          = getByTestId('button')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn', 'btn-primary')
})
