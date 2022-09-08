import { showOverlay, hideOverlay } from './use-overlay'
import { queryByTestId } from '@testing-library/vue'

it('should be able to show and hide overlay', async () => {
  await showOverlay()

  const overlay = queryByTestId(document.body, 'overlay')

  expect(overlay).toBeInTheDocument()

  await hideOverlay()

  expect(overlay).not.toBeInTheDocument()
})
