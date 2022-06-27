import { render, fireEvent } from '@testing-library/vue'
import Truncate from './Truncate.vue'

it('should be able to truncate long text', () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="1234567890"
        length="8" />
    `,
  })

  const span = screen.queryByTestId('truncate')

  expect(span).toHaveTextContent('12345...')
})

it('should not truncate the text if text\'s length less than max length', () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="1234567890"
        length="15" />
    `,
  })

  const span = screen.queryByTestId('truncate')

  expect(span).toHaveTextContent('1234567890')
})

it('should be able to change the omission text via prop `omission`', () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="1234567890"
        length="8"
        omission="[...]" />
    `,
  })

  const span = screen.queryByTestId('truncate')

  expect(span).toHaveTextContent('123[...]')
})

it('should show button "Show More" if prop `expandable` is provided', () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="1234567890"
        length="8"
        expandable />
    `,
  })

  const span   = screen.queryByTestId('truncate')
  const expand = screen.queryByText('Show More')

  expect(span).toHaveTextContent('12345...')
  expect(expand).toBeInTheDocument()
})

it('should not show button "Show More" if text\'s length less than max length', () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="1234567890"
        length="15"
        expandable />
    `,
  })

  const span   = screen.queryByTestId('truncate')
  const expand = screen.queryByText('Show More')

  expect(span).toHaveTextContent('1234567890')
  expect(expand).not.toBeInTheDocument()
})

it('should toggle the text if "Show More" clicked', async () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="1234567890"
        length="8"
        expandable />
    `,
  })

  let expand = screen.queryByTestId('truncate-expand')
  let span   = screen.queryByTestId('truncate')

  expect(span).toHaveTextContent('12345...')
  expect(expand).toBeInTheDocument()

  await fireEvent.click(expand)

  span   = screen.queryByTestId('truncate')
  expand = screen.queryByTestId('truncate-expand')

  expect(span).toHaveTextContent('1234567890')
  expect(expand).toHaveTextContent('Show Less')

  await fireEvent.click(expand)

  span   = screen.queryByTestId('truncate')
  expand = screen.queryByTestId('truncate-expand')

  expect(span).toHaveTextContent('12345...')
  expect(expand).toHaveTextContent('Show More')
})

it('should be able to change the text using props `show-more-text` and `show-less-text`', async () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="1234567890"
        length="8"
        expandable
        show-more-text="Lihat Selengkapnya"
        show-less-text="Sembunyikan" />
    `,
  })

  let expand = screen.queryByTestId('truncate-expand')
  let span   = screen.queryByTestId('truncate')

  expect(span).toHaveTextContent('12345...')
  expect(expand).toBeInTheDocument()

  await fireEvent.click(expand)

  span   = screen.queryByTestId('truncate')
  expand = screen.queryByTestId('truncate-expand')

  expect(span).toHaveTextContent('1234567890')
  expect(expand).toHaveTextContent('Sembunyikan')

  await fireEvent.click(expand)

  span   = screen.queryByTestId('truncate')
  expand = screen.queryByTestId('truncate-expand')

  expect(span).toHaveTextContent('12345...')
  expect(expand).toHaveTextContent('Lihat Selengkapnya')
})

it('should not truncate anything if length is invalid value', () => {
  const screen = render({
    components: { Truncate },
    template  : `
      <Truncate
        text="123456789123456789123456789"
        length="invalid" />
    `,
  })

  const span = screen.queryByTestId('truncate')

  expect(span).toHaveTextContent('123456789123456789123456789')
})
