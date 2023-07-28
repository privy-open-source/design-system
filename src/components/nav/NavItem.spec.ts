import { render } from '@testing-library/vue'
import Nav from './Nav.vue'
import NavItem from './NavItem.vue'
import IconEdit from '@privyid/persona-icon/vue/edit/20.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Nav, NavItem },
    template  : `
      <Nav>
        <NavItem>To Sign</NavItem>
      </Nav>
    `,
  })

  const navItem = screen.queryByTestId('nav-item')
  const navLink = screen.queryByTestId('nav-link')
  const text    = screen.queryByText('To Sign')

  expect(navItem).toBeInTheDocument()
  expect(navItem).toHaveClass('nav__item')
  expect(navLink).toBeInTheDocument()
  expect(navLink).toHaveClass('nav__link')
  expect(text).toBeInTheDocument()
})

it('should have style `active` by setting the `active` prop', () => {
  const screen = render({
    components: { Nav, NavItem },
    template  : `
      <Nav>
        <NavItem active>To Sign</NavItem>
      </Nav>
    `,
  })

  const navLink = screen.queryByTestId('nav-link')

  expect(navLink).toBeInTheDocument()
  expect(navLink).toHaveClass('nav__link', 'nav__link--active')
})

it('should have style `disabled` by setting the `disabled` prop', () => {
  const screen = render({
    components: { Nav, NavItem },
    template  : `
      <Nav>
        <NavItem disabled>To Sign</NavItem>
      </Nav>
    `,
  })

  const navLink = screen.queryByTestId('nav-link')

  expect(navLink).toBeInTheDocument()
  expect(navLink).toHaveClass('nav__link', 'nav__link--disabled')
})

it('should have `target` by setting the `target` prop', () => {
  const screen = render({
    components: { Nav, NavItem },
    template  : `
      <Nav>
        <NavItem target="_blank">To Sign</NavItem>
      </Nav>
    `,
  })

  const navLink = screen.queryByTestId('nav-link')

  expect(navLink).toBeInTheDocument()
  expect(navLink).toHaveAttribute('target', '_blank')
})

it('should have `href` by setting the `href` prop', () => {
  const screen = render({
    components: { Nav, NavItem },
    template  : `
      <Nav>
        <NavItem href="https://privy.id">To Sign</NavItem>
      </Nav>
    `,
  })

  const navLink = screen.queryByTestId('nav-link')

  expect(navLink).toBeInTheDocument()
  expect(navLink).toHaveAttribute('href', 'https://privy.id')
})

it('should be able to add icon via slot `icon`', () => {
  const screen = render({
    components: {
      Nav, NavItem, IconEdit,
    },
    template: `
      <Nav>
        <NavItem>
          <template #icon>
            <IconEdit />
          </template>
        </NavItem>
      </Nav>
    `,
  })

  const navLink = screen.queryByTestId('nav-link')

  expect(navLink).toBeInTheDocument()
  expect(navLink).toHaveClass('nav__link--icon')
})

it('should be able to add link class via props `link-class`', () => {
  const screen = render({
    components: { Nav, NavItem },
    template  : `
      <Nav>
        <NavItem link-class="link-class">link</NavItem>
      </Nav>
    `,
  })

  const navLink = screen.queryByTestId('nav-link')

  expect(navLink).toHaveClass('link-class')
})

it('should be using router-link if url without http', () => {
  const screen = render({
    components: { Nav, NavItem },
    template  : `
      <Nav>
        <NavItem href="/">link</NavItem>
      </Nav>
    `,
  })

  const navLink = screen.queryByTestId('nav-link')

  expect(navLink).toBeInTheDocument()
  expect(navLink).toContainHTML('router-link')
  expect(navLink).toHaveAttribute('to', '/')
})
