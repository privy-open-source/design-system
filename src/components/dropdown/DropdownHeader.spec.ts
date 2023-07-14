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

it('should be able to add an action via slot `action`', () => {
  const screen = render({
    components: { DropdownHeader },
    template  : `
      <DropdownHeader>
        Text
        <template #action>
          See details
        </template>
      </DropdownHeader>
    `,
  })

  const dropdownHeaderAction = screen.queryByTestId('dropdown-header-action')
  const text                 = screen.queryByText('See details')

  expect(dropdownHeaderAction).toBeInTheDocument()
  expect(dropdownHeaderAction).toHaveClass('dropdown__header__action')
  expect(text).toBeInTheDocument()
})
