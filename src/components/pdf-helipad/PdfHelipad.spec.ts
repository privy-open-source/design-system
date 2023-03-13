import { vi } from 'vitest'
import { render } from '@testing-library/vue'
import useDrag from '../pdf-object/__mocks__/use-drag'
import PdfHelipad from './PdfHelipad.vue'

vi.mock('./utils/use-drag.ts', () => ({ default: useDrag }))

it('should mount properly', () => {
  const screen = render({
    components: { PdfHelipad },
    template  : `
      <pdf-helipad/>
    `,
  })

  const helipad = screen.queryByTestId('pdf-helipad')
  const object  = screen.queryByTestId('pdf-helipad-object')

  expect(helipad).toBeInTheDocument()
  expect(object).toBeInTheDocument()
})
