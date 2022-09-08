import { render } from '@testing-library/vue'
import Dropzone from './Dropzone.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Dropzone },
    template  : '<Dropzone />',
  })

  const dropzone = screen.getByTestId('dropzone')

  expect(dropzone).toBeInTheDocument()
  expect(dropzone).toHaveClass('dropzone')
})
