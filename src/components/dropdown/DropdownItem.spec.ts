
import { render } from '@testing-library/vue'
import DropdownItem from './DropdownItem.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { DropdownItem },
    template  : `
      <DropdownItem>
        Hello
      </DropdownItem>
    `,
  })

  const dropdownItem = screen.queryByTestId('dropdown-item')
  const text         = screen.queryByText('Hello')

  expect(dropdownItem).toBeInTheDocument()
  expect(dropdownItem).toHaveClass('dropdown__item')
  expect(text).toBeInTheDocument()
})

it('should be able to set dropdown item text via `text` props', () => {
  const screen = render({
    components: { DropdownItem },
    template  : `
      <DropdownItem text="hello" />
    `,
  })

  const dropdownItem = screen.queryByTestId('dropdown-item')

  expect(dropdownItem).toBeInTheDocument()
  expect(dropdownItem).toHaveTextContent('hello')
})

it('should be an anchor when dropdown item has `href` props', async () => {
  const screen = render({
    components: { DropdownItem },
    template  : `
      <DropdownItem href="#" />
    `,
  })

  const dropdownItem = screen.queryByTestId('dropdown-item')

  expect(dropdownItem).toHaveAttribute('href')
  expect(dropdownItem).toContainHTML('a')
})

it('should be an anchor when dropdown item has `href` props', async () => {
  const screen = render({
    components: { DropdownItem },
    template  : `
      <DropdownItem active />
    `,
  })

  const dropdownItem = screen.queryByTestId('dropdown-item')

  expect(dropdownItem).toHaveClass('dropdown__item--active')
})
