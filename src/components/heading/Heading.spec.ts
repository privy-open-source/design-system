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
  const text    = screen.queryByText('Heading Title')

  expect(heading).toBeInTheDocument()
  expect(heading).toHaveClass('h3')
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
  expect(heading).toHaveClass('h1')
  expect(heading).not.toHaveClass('h3')
})

it('should have style "bold" if props `weight` is set to bold', () => {
  const screen = render({
    components: { Heading },
    template  : `
      <Heading weight="bold">
        Heading Text
      </Heading>
    `,
  })

  const heading = screen.queryByTestId('heading')
  const text    = screen.queryByText('Heading Text')

  expect(heading).toBeInTheDocument()
  expect(heading).toHaveClass('heading--bold')
  expect(text).toBeInTheDocument()
})

it('should have style "uppercase" if props `transform` is set to uppercase', () => {
  const screen = render({
    components: { Heading },
    template  : `
      <Heading transform="uppercase">
        Heading Text
      </Heading>
    `,
  })

  const heading = screen.queryByTestId('heading')
  const text    = screen.queryByText('Heading Text')

  expect(heading).toBeInTheDocument()
  expect(heading).toHaveClass('heading--uppercase')
  expect(text).toBeInTheDocument()
})
