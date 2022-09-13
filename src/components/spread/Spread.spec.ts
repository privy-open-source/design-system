import { render } from '@testing-library/vue'
import Spread from './Spread.vue'

it('should render properly', () => {
  const screen = render({
    components: { Spread },
    template  : '<Spread />',
  })

  const spread = screen.queryByTestId('spread')

  expect(spread).toBeInTheDocument()
  expect(spread).not.toHaveClass('spread--active')
})

it('should have style if props `active` set to `true`', () => {
  const screen = render({
    components: { Spread },
    template  : '<Spread active />',
  })

  const spread = screen.queryByTestId('spread')

  expect(spread).toBeInTheDocument()
  expect(spread).toHaveClass('spread--active')
})
