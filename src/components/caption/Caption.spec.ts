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

it('should have style "bold" if props `weight` is set to bold', () => {
  const screen = render({
    components: { Caption },
    template  : `
      <Caption weight="bold">
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

it('should have style "uppercase" if props `transform` is set to uppercase', () => {
  const screen = render({
    components: { Caption },
    template  : `
      <Caption transform="uppercase">
        Caption Text
      </Caption>
    `,
  })

  const caption = screen.queryByTestId('caption')
  const text    = screen.queryByText('Caption Text')

  expect(caption).toBeInTheDocument()
  expect(caption).toHaveClass('caption', 'caption--uppercase')
  expect(text).toBeInTheDocument()
})

it('should have style "tiny" if props `size` is set to tn', () => {
  const screen = render({
    components: { Caption },
    template  : `
      <Caption size="tn">
        Caption Text
      </Caption>
    `,
  })

  const caption = screen.queryByTestId('caption')
  const text    = screen.queryByText('Caption Text')

  expect(caption).toBeInTheDocument()
  expect(caption).toHaveClass('caption', 'caption--tn')
  expect(text).toBeInTheDocument()
})
