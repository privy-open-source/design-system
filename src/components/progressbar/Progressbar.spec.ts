import { render } from '@testing-library/vue'
import Progressbar from './Progressbar.vue'

it('should mounted properly', () => {
  const screen = render({
    components: { Progressbar },
    template  : '<Progressbar />',
  })

  const progressbar = screen.queryByTestId('progressbar')

  expect(progressbar).toBeInTheDocument()
})

it('should able to progress value based on prop `value`', () => {
  const screen = render({
    components: { Progressbar },
    template  : '<Progressbar value="45" />',
  })

  const progressbar = screen.queryByTestId('progressbar-bar')

  expect(progressbar).toBeInTheDocument()
  expect(progressbar).toHaveStyle({ width: '45%' })
})

it('should has style indeterminate if prop `indeterminate` set to true', () => {
  const screen = render({
    components: { Progressbar },
    template  : '<Progressbar indeterminate />',
  })

  const progressbar = screen.queryByTestId('progressbar')

  expect(progressbar).toBeInTheDocument()
  expect(progressbar).toHaveClass('progressbar--indeterminate')
})

it('should has style success if prop `success` set to true', () => {
  const screen = render({
    components: { Progressbar },
    template  : '<Progressbar success />',
  })

  const progressbar = screen.queryByTestId('progressbar')
  const bar         = screen.queryByTestId('progressbar-bar')

  expect(progressbar).toBeInTheDocument()
  expect(progressbar).toHaveClass('progressbar--success')

  expect(bar).toHaveStyle({ width: '100%' })
})

it('should has style success if prop `error` set to true', () => {
  const screen = render({
    components: { Progressbar },
    template  : '<Progressbar error />',
  })

  const progressbar = screen.queryByTestId('progressbar')
  const bar         = screen.queryByTestId('progressbar-bar')

  expect(progressbar).toBeInTheDocument()
  expect(progressbar).toHaveClass('progressbar--error')

  expect(bar).toHaveStyle({ width: '100%' })
})
