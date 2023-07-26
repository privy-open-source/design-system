import { render } from '@testing-library/vue'
import Spinner from './Spinner.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Spinner },
    template  : '<Spinner />',
  })

  const spinner = screen.getByTestId('spinner')

  expect(spinner).toBeInTheDocument()
  expect(spinner).toHaveClass('spinner', 'spinner-basic')
})
