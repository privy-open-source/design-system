import { render } from '@testing-library/vue'
import pDivider from './Divider.vue'

it('should render properly', () => {
  const screen = render({
    components: { pDivider },
    template  : '<p-divider />',
  })

  const divider = screen.queryByTestId('divider')

  expect(divider).toBeInTheDocument()
  expect(divider).toHaveClass('divider', 'divider--horizontal')
})

it('should have style vertical if prop vertical was provided', () => {
  const screen = render({
    components: { pDivider },
    template  : '<p-divider vertical />',
  })

  const divider = screen.queryByTestId('divider')

  expect(divider).toBeInTheDocument()
  expect(divider).toHaveClass('divider', 'divider--vertical')
  expect(divider).not.toHaveClass('divider--horizontal')
})
