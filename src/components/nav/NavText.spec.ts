import { render } from '@testing-library/vue'
import Nav from './Nav.vue'
import NavText from './NavText.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Nav, NavText },
    template  : `
      <Nav>
        <NavText>text</NavText>
      </Nav>
    `,
  })

  const navForm = screen.queryByTestId('nav-text')
  const text    = screen.queryByText('text')

  expect(navForm).toBeInTheDocument()
  expect(navForm).toHaveClass('nav__text')
  expect(text).toBeInTheDocument()
})
