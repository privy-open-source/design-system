import { render } from '@testing-library/vue'
import Nav from './Nav.vue'
import NavItem from './NavItem.vue'
import NavItemDropdown from './NavItemDropdown.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: {
      Nav, NavItem, NavItemDropdown,
    },
    template: `
      <Nav>
        <NavItemDropdown>
        </NavItemDropdown>
      </Nav>
    `,
  })

  const dropdown = screen.queryByTestId('nav-item-dropdown')

  expect(dropdown).toBeInTheDocument()
  expect(dropdown).toHaveClass('nav__item', 'nav__item--dropdown')
})

it('should be able to change button text via props `text`', () => {
  const screen = render({
    components: {
      Nav, NavItem, NavItemDropdown,
    },
    template: `
      <Nav>
        <NavItemDropdown text="text">
        </NavItemDropdown>
      </Nav>
    `,
  })

  const text = screen.queryByText('text')
  expect(text).toBeInTheDocument()
})

it('should be able to change to icon mode via `icon` prop', () => {
  const screen = render({
    components: {
      Nav, NavItem, NavItemDropdown,
    },
    template: `
      <Nav>
        <NavItemDropdown icon>
        </NavItemDropdown>
      </Nav>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--ghost', 'btn--icon')
})

it('should be able to hide dropdown caret with `no-caret` prop', () => {
  const screen = render({
    components: {
      Nav, NavItem, NavItemDropdown,
    },
    template: `
      <Nav>
        <NavItemDropdown no-caret>
        </NavItemDropdown>
      </Nav>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')
  const caret  = screen.queryByTestId('dropdown-caret')

  expect(button).toBeInTheDocument()
  expect(caret).not.toBeInTheDocument()
})
