import { render } from '@testing-library/vue'
import Caption from './Caption.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Caption },
    template  : `
      <Caption>
        Caption Text
      </Caption>
    `,
  })

  const caption = screen.queryByTestId('caption')
  const text    = screen.queryByText('Caption Text')

  expect(caption).toBeInTheDocument()
  expect(caption).toHaveClass('caption')
  expect(text).toBeInTheDocument()
})

it('should have style "bold" if props `bold` is set to true', () => {
  const screen = render({
    components: { Caption },
    template  : `
      <Caption bold>
        Caption Text
      </Caption>
    `,
  })

  const caption = screen.queryByTestId('caption')
  const text    = screen.queryByText('Caption Text')

  expect(caption).toBeInTheDocument()
  expect(caption).toHaveClass('caption', 'caption--bold')
  expect(text).toBeInTheDocument()
})
