import { render } from '@testing-library/vue'
import DropdownText from './DropdownText.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { DropdownText },
    template  : `
      <DropdownText>
        Text
      </DropdownText>
    `,
  })

  const dropdownText = screen.queryByTestId('dropdown-text')
  const text         = screen.queryByText('Text')

  expect(dropdownText).toBeInTheDocument()
  expect(dropdownText).toHaveClass('dropdown__item--text')
  expect(text).toBeInTheDocument()
})
