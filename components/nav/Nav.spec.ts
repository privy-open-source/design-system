import { render } from '@testing-library/vue'
import Nav from './Nav.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav>
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--tabs', 'nav--align-left')
})

it('should have style `fill` by setting the `fill` prop', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav fill>
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--fill')
})

it('should have style `justified` by setting the `justified` prop', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav justified>
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--justified')
})

it('should have style `vertical` by setting the `vertical` prop', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav vertical>
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--vertical')
})

it('should have style `pills` if variant props set to `pills`', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav variant="pills">
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav--pills')
  expect(nav).not.toHaveClass('nav--tabs')
})

it('should be able to change alignment via props `align`', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav align="center">
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--tabs', 'nav--align-center')
})
