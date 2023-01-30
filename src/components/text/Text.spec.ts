import { render } from '@testing-library/vue'
import Text from './Text.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Text },
    template  : `
      <Text>
        Some text
      </Text>
    `,
  })

  const text    = screen.queryByTestId('freetext')
  const content = screen.queryByText('Some text')

  expect(text).toBeInTheDocument()
  expect(text).toHaveClass('freetext', 'freetext--body')
  expect(content).toBeInTheDocument()
})

it('should have style "h1" if `variant` set to h1', () => {
  const screen = render({
    components: { Text },
    template  : `
      <Text variant="h1">
        Some text
      </Text>
    `,
  })

  const text = screen.queryByTestId('freetext')

  expect(text).toBeInTheDocument()
  expect(text).toHaveClass('freetext--h1')
  expect(text).not.toHaveClass('freetext--body')
})

it('should have style "hyperlink" if props `hyperlink` is provided', () => {
  const screen = render({
    components: { Text },
    template  : `
      <Text href="https://privy.id">
        Some hyperlink
      </Text>
    `,
  })

  const text    = screen.queryByTestId('freetext')
  const content = screen.queryByText('Some hyperlink')

  expect(text).toBeInTheDocument()
  expect(text).toHaveClass('freetext--hyperlink')
  expect(content).toBeInTheDocument()
})

it('should have font weight "medium" if props `hyperlink` is provided in `caption` variant', () => {
  const screen = render({
    components: { Text },
    template  : `
      <Text variant="caption" href="https://privy.id">
        Caption hyperlink
      </Text>
    `,
  })

  const text    = screen.queryByTestId('freetext')
  const content = screen.queryByText('Caption hyperlink')

  expect(text).toBeInTheDocument()
  expect(text).toHaveClass('freetext--hyperlink', 'freetext--medium')
  expect(content).toBeInTheDocument()
})
