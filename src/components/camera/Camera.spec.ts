import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import { takePicture } from './__mocks__/take-picture'
import Camera from './Camera.vue'

vi.mock('./utils/take-picture.ts', () => {
  return { takePicture }
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly', () => {
  const screen = render({
    components: { Camera },
    template  : '<Camera />',
  })

  const camera = screen.queryByTestId('camera')

  expect(camera).toBeInTheDocument()
})
