import { render } from '@testing-library/vue'
import Navbar from './Navbar.vue'
import NavbarBrand from './NavbarBrand.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Navbar, NavbarBrand },
    template  : `
      <Navbar>
        <NavbarBrand>Brand</NavbarBrand>
      </Navbar>
    `,
  })

  const navbarBrand = screen.queryByTestId('navbar-brand')
  const text        = screen.queryByText('Brand')

  expect(navbarBrand).toBeInTheDocument()
  expect(navbarBrand).toHaveClass('navbar__brand')
  expect(text).toBeInTheDocument()
})

it('should have add target url by setting the `href` prop', () => {
  const screen = render({
    components: { Navbar, NavbarBrand },
    template  : `
      <Navbar>
        <NavbarBrand href="https://privy.id">Brand</NavbarBrand>
      </Navbar>
    `,
  })

  const navbarBrand = screen.queryByTestId('navbar-brand')

  expect(navbarBrand).toBeInTheDocument()
  expect(navbarBrand).toHaveAttribute('href', 'https://privy.id')
})
