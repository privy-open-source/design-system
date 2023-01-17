import { render } from '@testing-library/vue'
import PdfObjectAddon from './PdfObjectAddon.vue'

it('should render properly', () => {
  const screen = render({
    components: { PdfObjectAddon },
    template  : '<PdfObjectAddon />',
  })

  const addon = screen.queryByTestId('pdf-object-addon')

  expect(addon).toBeInTheDocument()
  expect(addon).toHaveClass('pdf-object__addon--right')
})

it('should able to adjust position using prop `position`', () => {
  const screen = render({
    components: { PdfObjectAddon },
    template  : '<PdfObjectAddon position="top" />',
  })

  const addon = screen.queryByTestId('pdf-object-addon')

  expect(addon).toBeInTheDocument()
  expect(addon).toHaveClass('pdf-object__addon--top')
  expect(addon).not.toHaveClass('pdf-object__addon--right')
})
