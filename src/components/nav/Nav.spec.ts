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
  expect(nav).toHaveClass('nav', 'nav--pills', 'nav--align-left')
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

it('should have style `lines` if variant props set to `lines`', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav variant="lines">
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav--lines')
  expect(nav).not.toHaveClass('nav--pills')
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
  expect(nav).toHaveClass('nav', 'nav--pills', 'nav--align-center')
})

it('should be able to add navigation title via props `title`', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav title="Document">
      </Nav>
    `,
  })

  const nav   = screen.queryByTestId('nav')
  const title = screen.queryByText('Document')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--has-title')
  expect(title).toBeInTheDocument()
})

it('should be able to make condensed navigation via props `condensed`', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav condensed>
      </Nav>
    `,
  })

  const nav = screen.queryByTestId('nav')

  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('nav', 'nav--condensed')
})

it('should be able to add navigation title-action via props `title-action-label` and `title-action-url`', () => {
  const screen = render({
    components: { Nav },
    template  : `
      <Nav title="Title" title-action-url="/home" title-action-label="Action" />
    `,
  })

  const nav      = screen.queryByTestId('nav')
  const navTitle = screen.queryByTestId('nav-action')

  expect(nav).toBeInTheDocument()
  expect(navTitle).toBeInTheDocument()
  expect(navTitle).toHaveTextContent('Action')
  expect(navTitle).toHaveAttribute('href', '/home')
})
