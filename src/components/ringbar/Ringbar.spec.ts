import { render } from '@testing-library/vue'
import Ringbar from './Ringbar.vue'

it('should mounted properly', () => {
  const screen = render({
    components: { Ringbar },
    template  : '<ringbar />',
  })

  const ringbar = screen.queryByTestId('ringbar')

  expect(ringbar).toBeInTheDocument()
})
