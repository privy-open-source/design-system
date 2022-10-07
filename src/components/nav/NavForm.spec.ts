import { render } from '@testing-library/vue'
import Nav from './Nav.vue'
import NavForm from './NavForm.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Nav, NavForm },
    template  : `
      <Nav>
        <NavForm>form</NavForm>
      </Nav>
    `,
  })

  const navForm = screen.queryByTestId('nav-form')
  const text    = screen.queryByText('form')

  expect(navForm).toBeInTheDocument()
  expect(navForm).toHaveClass('nav__form')
  expect(text).toBeInTheDocument()
})
