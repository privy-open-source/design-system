import { render } from '@testing-library/vue'
import Navbar from './Navbar.vue'
import NavbarNav from './NavbarNav.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Navbar, NavbarNav },
    template  : `
      <Navbar>
        <NavbarNav></NavbarNav>
      </Navbar>
    `,
  })

  const navbarNav = screen.queryByTestId('navbar-nav')

  expect(navbarNav).toBeInTheDocument()
  expect(navbarNav).toHaveClass('navbar__nav')
})

it('should be able to change alignment via props `align`', () => {
  const screen = render({
    components: { Navbar, NavbarNav },
    template  : `
      <Navbar>
        <NavbarNav align="left"></NavbarNav>
      </Navbar>
    `,
  })

  const navbarNav = screen.queryByTestId('navbar-nav')

  expect(navbarNav).toBeInTheDocument()
  expect(navbarNav).toHaveClass('nav--align-left')
})

it('should be able to change variant via prop `variant`', () => {
  const screen = render({
    components: { Navbar, NavbarNav },
    template  : `
      <Navbar>
        <NavbarNav variant="lines"></NavbarNav>
      </Navbar>
    `,
  })

  const navbarNav = screen.queryByTestId('navbar-nav')

  expect(navbarNav).toBeInTheDocument()
  expect(navbarNav).toHaveClass('nav--lines')
})

it('should be able to make condensed navigation via prop `condensed`', () => {
  const screen = render({
    components: { Navbar, NavbarNav },
    template  : `
      <Navbar condensed>
        <NavbarNav></NavbarNav>
      </Navbar>
    `,
  })

  const navbarNav = screen.queryByTestId('navbar-nav')

  expect(navbarNav).toBeInTheDocument()
  expect(navbarNav).toHaveClass('nav--condensed')
})
