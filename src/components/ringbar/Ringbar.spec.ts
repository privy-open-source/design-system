import { render } from '@testing-library/vue'
import Ringbar from './Ringbar.vue'

it('should mounted properly', () => {
  const screen = render({
    components: { Ringbar },
    template  : '<Ringbar />',
  })

  const ringbar = screen.queryByTestId('ringbar')

  expect(ringbar).toBeInTheDocument()
})

it('should able to progress value based on prop `value`', () => {
  const screen = render({
    components: { Ringbar },
    template  : '<Ringbar value="45" />',
  })

  const ringbar  = screen.queryByTestId('ringbar-ring')
  const expected = (1 - 0.45) * 50.265_482_5

  expect(ringbar).toBeInTheDocument()
  expect(ringbar).toHaveAttribute('stroke-dashoffset', expected.toPrecision(11))
})

it('should has style indeterminate if prop `indeterminate` set to true', () => {
  const screen = render({
    components: { Ringbar },
    template  : '<Ringbar indeterminate />',
  })

  const ringbar = screen.queryByTestId('ringbar')

  expect(ringbar).toBeInTheDocument()
  expect(ringbar).toHaveClass('ringbar--indeterminate')
})

it('should able to change size using prop `size`', () => {
  const screen = render({
    components: { Ringbar },
    template  : '<Ringbar size="sm" />',
  })

  const ringbar = screen.queryByTestId('ringbar')

  expect(ringbar).toBeInTheDocument()
  expect(ringbar).toHaveClass('ringbar--sm')
  expect(ringbar).not.toHaveClass('ringbar--md')
})
