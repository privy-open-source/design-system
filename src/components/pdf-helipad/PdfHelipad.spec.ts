import { vi } from 'vitest'
import { render } from '@testing-library/vue'
import useDrag, {
  triggerDragStart,
  triggerDragMove,
  triggerDragEnd,
} from '../pdf-object/__mocks__/use-drag'
import PdfHelipad from './PdfHelipad.vue'
import PdfObject from '../pdf-object/PdfObject.vue'
import PdfObjects from '../pdf-object/PdfObjects.vue'
import { ref } from 'vue-demi'

vi.mock('./utils/use-drag.ts', () => ({ default: useDrag }))

vi.mock('../pdf-object/utils/use-drop.ts', () => ({ default: vi.fn(() => ref(true)) }))

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

it('should in disabled state if prop disabled was provided', () => {
  const screen = render({
    components: { PdfHelipad },
    template  : `
      <pdf-helipad disabled />
    `,
  })

  const helipad = screen.queryByTestId('pdf-helipad')

  expect(helipad).toBeInTheDocument()
  expect(helipad).toHaveClass('pdf-helipad--disabled')
})

it('should follow the cursor when dragged', async () => {
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

  vi.spyOn(object, 'getBoundingClientRect').mockReturnValueOnce({
    top   : 400,
    y     : 400,
    left  : 100,
    x     : 100,
    width : 198,
    height: 106,
    bottom: 0,
    right : 0,
    toJSON: vi.fn(),
  })

  await triggerDragStart()

  expect(object).toHaveStyle({
    position : 'fixed',
    transform: 'translate(100px, 400px) scale(1)',
  })

  await triggerDragMove({
    clientX: 500,
    clientY: 500,
    rect   : {
      top   : 400,
      left  : 100,
      width : 198,
      height: 106,
      bottom: 0,
      right : 0,
    },
  })

  expect(object).toHaveStyle({
    position : 'fixed',
    transform: 'translate(401px, 447px) scale(1)',
  })
})

it('should emit landed if object successfully dropped', async () => {
  const onLanded = vi.fn()
  const screen   = render({
    components: {
      PdfHelipad,
      PdfObject,
      PdfObjects,
    },
    template: `
      <pdf-helipad @landed="onLanded" />
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
      </pdf-objects>
    `,
    setup () {
      return { onLanded }
    },
  })

  const helipad = screen.queryByTestId('pdf-helipad')
  const object  = screen.queryByTestId('pdf-helipad-object')
  const page2   = screen.queryByTestId('page-2')

  expect(helipad).toBeInTheDocument()
  expect(object).toBeInTheDocument()

  vi.spyOn(page2, 'getBoundingClientRect').mockReturnValue({
    top   : 100,
    y     : 100,
    x     : 100,
    left  : 100,
    width : 791,
    height: 1122,
    bottom: 0,
    right : 0,
    toJSON: vi.fn(),
  })

  vi.spyOn(object, 'getBoundingClientRect').mockReturnValueOnce({
    top   : 400,
    y     : 400,
    left  : 100,
    x     : 100,
    width : 300,
    height: 400,
    bottom: 0,
    right : 0,
    toJSON: vi.fn(),
  })

  await triggerDragEnd(page2 as HTMLDivElement)

  expect(object).toHaveStyle({ position: 'absolute' })
  expect(onLanded).toBeCalledWith({
    x     : 1,
    y     : 300,
    page  : 2,
    width : 198,
    height: 106,
  })
})
