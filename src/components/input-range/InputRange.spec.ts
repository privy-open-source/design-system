import { render } from '@testing-library/vue'
import InputRange from './InputRange.vue'

it('should render properly without any prop', () => {
  const screen = render({
    components: { InputRange },
    template  : '<input-range />',
  })

  const input = screen.queryByTestId('input-range')

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass('input-range')
})
