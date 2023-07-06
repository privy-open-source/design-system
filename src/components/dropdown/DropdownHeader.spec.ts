import { render } from '@testing-library/vue'
import DropdownHeader from './DropdownHeader.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { DropdownHeader },
    template  : `
      <DropdownHeader>
        Text
      </DropdownHeader>
    `,
  })

  const dropdownHeader = screen.queryByTestId('dropdown-header')
  const text           = screen.queryByText('Text')

  expect(dropdownHeader).toBeInTheDocument()
  expect(dropdownHeader).toHaveClass('dropdown__header')
  expect(text).toBeInTheDocument()
})
