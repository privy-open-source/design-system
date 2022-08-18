import { render } from '@testing-library/vue'
import Nav from './Nav.vue'
import NavItem from './NavItem.vue'
import NavSubItem from './NavSubItem.vue'
import IconEdit from '@carbon/icons-vue/lib/edit/16'

it('should rendered properly without any props', () => {
  const screen = render({
    components: {
      Nav, NavItem, NavSubItem,
    },
    template: `
      <Nav>
        <NavSubItem>
        </NavSubItem>
      </Nav>
    `,
  })

  const navSubItem = screen.queryByTestId('nav-subitem')

  expect(navSubItem).toBeInTheDocument()
  expect(navSubItem).toHaveClass('nav__subitem')
})

it('should be abble to change parent-submenu text via props `text`', () => {
  const screen = render({
    components: {
      Nav, NavItem, NavSubItem,
    },
    template: `
      <Nav>
        <NavSubItem text="Documents">
          <Nav>
            <NavItem active>To Sign</NavItem>
            <NavItem>To Review</NavItem>
          </Nav>
        </NavSubItem>
      </Nav>
    `,
  })

  const navSubItem = screen.queryByTestId('nav-subitem')
  const text       = screen.queryByText('Documents')

  expect(navSubItem).toBeInTheDocument()
  expect(navSubItem).toHaveClass('nav__subitem')
  expect(text).toBeInTheDocument()
})

it('should be able to add icon via slot `icon`', () => {
  const screen = render({
    components: {
      Nav, NavItem, IconEdit, NavSubItem,
    },
    template: `
      <Nav>
        <NavSubItem text="Documents">
          <template #icon>
            <IconDocument />
          </template>
          <Nav>
            <NavItem active>To Sign</NavItem>
            <NavItem>To Review</NavItem>
          </Nav>
        </NavSubItem>
      </Nav>
    `,
  })

  const navSubItem = screen.queryByTestId('nav-subitem')

  expect(navSubItem).toBeInTheDocument()
  expect(navSubItem).toHaveClass('nav__subitem--icon')
})
