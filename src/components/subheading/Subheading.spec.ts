import { render } from '@testing-library/vue'
import Subheading from './Subheading.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Subheading },
    template  : `
      <Subheading>
        Subheading Title
      </Subheading>
    `,
  })

  const subheading = screen.queryByTestId('subheading')
  const text       = screen.queryByText('Subheading Title')

  expect(subheading).toBeInTheDocument()
  expect(subheading).toHaveClass('subheading', 'subheading--md')
  expect(text).toBeInTheDocument()
})

it('should have style "sm" if size set to "sm"', () => {
  const screen = render({
    components: { Subheading },
    template  : `
      <Subheading size="sm">
        Title
      </Subheading>
    `,
  })

  const subheading = screen.queryByTestId('subheading')

  expect(subheading).toBeInTheDocument()
  expect(subheading).toHaveClass('subheading', 'subheading--sm')
  expect(subheading).not.toHaveClass('subheading--md')
})

it('should have style "overline" if overline prop is provided', () => {
  const screen = render({
    components: { Subheading },
    template  : `
      <Subheading overline>
        Title
      </Subheading>
    `,
  })

  const subheading = screen.queryByTestId('subheading')

  expect(subheading).toBeInTheDocument()
  expect(subheading).toHaveClass('subheading', 'subheading--overline')
  expect(subheading).not.toHaveClass('subheading--md', 'subheading--sm')
})

it('should have style "bold" if props `weight` is set to bold', () => {
  const screen = render({
    components: { Subheading },
    template  : `
      <Subheading weight="bold">
        Subheading Text
      </Subheading>
    `,
  })

  const subheading = screen.queryByTestId('subheading')
  const text       = screen.queryByText('Subheading Text')

  expect(subheading).toBeInTheDocument()
  expect(subheading).toHaveClass('subheading--bold')
  expect(text).toBeInTheDocument()
})

it('should have style "uppercase" if props `transform` is set to uppercase', () => {
  const screen = render({
    components: { Subheading },
    template  : `
      <Subheading transform="uppercase">
        Subheading Text
      </Subheading>
    `,
  })

  const subheading = screen.queryByTestId('subheading')
  const text       = screen.queryByText('Subheading Text')

  expect(subheading).toBeInTheDocument()
  expect(subheading).toHaveClass('subheading--uppercase')
  expect(text).toBeInTheDocument()
})
