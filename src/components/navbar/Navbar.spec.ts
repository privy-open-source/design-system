import { render } from '@testing-library/vue'
import Navbar from './Navbar.vue'
import NavbarBrand from './NavbarBrand.vue'
import NavbarNav from './NavbarNav.vue'
import NavItem from '../nav/NavItem.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Navbar },
    template  : `
      <Navbar>
      </Navbar>
    `,
  })

  const navbar = screen.queryByTestId('navbar')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar')
})

it('should be able to change variant via prop `variant`', () => {
  const screen = render({
    components: { Navbar },
    template  : `
      <Navbar variant="pills">
      </Navbar>
    `,
  })

  const navbar = screen.queryByTestId('navbar')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar--pills')
})

it('should be able to make navbar fixed via prop `fixed`', () => {
  const screen = render({
    components: {
      Navbar, NavbarBrand, NavbarNav, NavItem,
    },
    template: `
      <Navbar fixed>
        <NavbarBrand>
          <img src="../../public/assets/images/logo-privy.svg" />
        </NavbarBrand>
        <NavbarNav>
          <NavItem>Label</NavItem>
        </NavbarNav>
      </Navbar>
    `,
  })

  const navbar = screen.queryByTestId('navbar')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar', 'navbar--fixed')
})

it('should be able to make navbar sticky via prop `sticky`', () => {
  const screen = render({
    components: { Navbar },
    template  : '<Navbar sticky />',
  })

  const navbar = screen.queryByTestId('navbar')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar', 'navbar--sticky')
})

it('should be able to make content automatically expand via prop `toggleable`', () => {
  const screen = render({
    components: { Navbar },
    template  : `
      <Navbar toggleable="lg">
      </Navbar>
    `,
  })

  const navbar = screen.queryByTestId('navbar')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar--expand-lg')
  expect(navbar).not.toHaveClass('navbar--expand-md')
})
