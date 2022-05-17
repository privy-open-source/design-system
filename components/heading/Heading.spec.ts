import { render } from '@testing-library/vue'
import Heading from './Heading.vue'

it('should rendered properly without any props', () => {
    const screen = render({
      components: { Heading },
      template  : `
        <Heading>
          Heading Title
        </Heading>
      `,
    })
  
    const heading = screen.queryByTestId('heading')
    const text   = screen.queryByText('Heading Title')
  
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('heading', 'text-6xl')
    expect(text).toBeInTheDocument()
})

it('should have style "h1" if element set to "h1"', () => {
    const screen = render({
      components: { Heading },
      template  : `
        <Heading element="h1">
          Title
        </Heading>
      `,
    })
  
    const heading = screen.queryByTestId('heading')
  
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('heading', 'text-7xl')
    expect(heading).not.toHaveClass('text-6xl')
  })
  