import { render } from '@testing-library/vue'
import Progressbar from './Progressbar.vue'

it('should mounted properly', () => {
  const screen = render({
    components: { Progressbar },
    template  : '<progressbar />',
  })

  const progressbar = screen.queryByTestId('progressbar')

  expect(progressbar).toBeInTheDocument()
})
