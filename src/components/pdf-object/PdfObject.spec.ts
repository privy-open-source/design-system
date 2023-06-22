import { delay } from 'nanodelay'
import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import useResize, { triggerResize } from './__mocks__/use-resize'
import useDrag, {
  triggerDragEnd,
  triggerDragMove,
  triggerDragStart,
} from './__mocks__/use-drag'
import { reactive, ref } from 'vue-demi'
import * as pdfUtils from '.'
import PdfObject from './PdfObject.vue'
import PdfObjects from './PdfObjects.vue'

vi.mock('./utils/use-drop.ts', () => ({ default: vi.fn(() => ref(true)) }))

vi.mock('./utils/use-drag.ts', () => ({ default: useDrag }))

vi.mock('./utils/use-resize.ts', () => ({ default: useResize }))

it('should render properly', async () => {
  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object>
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
  })

  const object = screen.queryByTestId('pdf-object')

  await delay(0) // Waiting for rendering done

  expect(object).toBeInTheDocument()
})

it('should able to micro-adjust using arrow-keyboard', async () => {
  const model = reactive({
    page  : 1,
    x     : 50,
    y     : 50,
    width : undefined,
    height: undefined,
  })

  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object
          v-model:page="model.page"
          v-model:x="model.x"
          v-model:y="model.y"
          v-model:width="model.width"
          v-model:height="model.height">
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
    setup () {
      return { model }
    },
  })

  const page   = screen.queryByTestId('page-1')
  const object = screen.queryByTestId('pdf-object')

  vi.spyOn(page, 'clientWidth', 'get').mockReturnValue(793)
  vi.spyOn(page, 'clientHeight', 'get').mockReturnValue(1122)

  await fireEvent.keyDown(object, { key: 'ArrowUp' })

  expect(model.x).toBe(50)
  expect(model.y).toBe(49)

  await fireEvent.keyDown(object, { key: 'ArrowDown' })
  await fireEvent.keyDown(object, { key: 'ArrowDown' })

  expect(model.x).toBe(50)
  expect(model.y).toBe(51)

  await fireEvent.keyDown(object, { key: 'ArrowLeft' })

  expect(model.x).toBe(49)
  expect(model.y).toBe(51)

  await fireEvent.keyDown(object, { key: 'ArrowRight' })
  await fireEvent.keyDown(object, { key: 'ArrowRight' })

  expect(model.x).toBe(51)
  expect(model.y).toBe(51)
})

it('should move faster if using arrow-keyboard + shiftKey', async () => {
  const model = reactive({
    page  : 1,
    x     : 50,
    y     : 50,
    width : undefined,
    height: undefined,
  })

  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object
          v-model:page="model.page"
          v-model:x="model.x"
          v-model:y="model.y"
          v-model:width="model.width"
          v-model:height="model.height">
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
    setup () {
      return { model }
    },
  })

  const page   = screen.queryByTestId('page-1')
  const object = screen.queryByTestId('pdf-object')

  vi.spyOn(page, 'clientWidth', 'get').mockReturnValue(793)
  vi.spyOn(page, 'clientHeight', 'get').mockReturnValue(1122)

  await fireEvent.keyDown(object, { key: 'ArrowUp', shiftKey: true })

  expect(model.x).toBe(50)
  expect(model.y).toBe(40)
})

it('should move to edge if using arrow-keyboard + ctrlKey or metaKey', async () => {
  const model = reactive({
    page  : 1,
    x     : 50,
    y     : 50,
    width : undefined,
    height: undefined,
  })

  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object
          v-model:page="model.page"
          v-model:x="model.x"
          v-model:y="model.y"
          v-model:width="model.width"
          v-model:height="model.height">
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
    setup () {
      return { model }
    },
  })

  const page   = screen.queryByTestId('page-1')
  const object = screen.queryByTestId('pdf-object')

  vi.spyOn(page, 'clientWidth', 'get').mockReturnValue(793)
  vi.spyOn(page, 'clientHeight', 'get').mockReturnValue(1122)

  await fireEvent.keyDown(object, { key: 'ArrowRight', ctrlKey: true })

  expect(model.x).toBe(595)
  expect(model.y).toBe(50)

  await fireEvent.keyDown(object, { key: 'ArrowUp', metaKey: true })

  expect(model.x).toBe(595)
  expect(model.y).toBe(0)
})

it('should change width and height if resized', async () => {
  const model = reactive({
    page  : 1,
    x     : 50,
    y     : 50,
    width : 150,
    height: 150,
  })

  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object
          v-model:page="model.page"
          v-model:x="model.x"
          v-model:y="model.y"
          v-model:width="model.width"
          v-model:height="model.height">
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
    setup () {
      return { model }
    },
  })

  const object = screen.queryByTestId('pdf-object')

  await delay(0)

  expect(model.width).toBe(150)
  expect(model.height).toBe(150)
  expect(object).toHaveStyle({ width: '150px', height: '150px' })

  await triggerResize(300, 300)

  expect(model.width).toBe(300)
  expect(model.height).toBe(300)
})

it('should moving position when dragged', async () => {
  const model = reactive({
    page  : 1,
    x     : 50,
    y     : 50,
    width : 150,
    height: 150,
  })

  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object
          v-model:page="model.page"
          v-model:x="model.x"
          v-model:y="model.y"
          v-model:width="model.width"
          v-model:height="model.height">
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
    setup () {
      return { model }
    },
  })

  const object = screen.queryByTestId('pdf-object')
  const page2  = screen.queryByTestId('page-2')

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

  await triggerDragStart()

  expect(object).toHaveStyle({
    position : 'fixed',
    transform: 'translate(100px, 400px) scale(1)',
  })

  expect(model.x).toBe(100)
  expect(model.y).toBe(400)

  await triggerDragMove({ dx: 300, dy: 300 })

  expect(object).toHaveStyle({
    position : 'fixed',
    transform: 'translate(400px, 700px) scale(1)',
  })

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
  expect(model.x).toBe(0)
  expect(model.y).toBe(300)
  expect(model.page).toBe(2)
})

it('should revert the last position if droped wrong place', async () => {
  const model = reactive({
    page  : 1,
    x     : 50,
    y     : 50,
    width : 150,
    height: 150,
  })

  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object
          v-model:page="model.page"
          v-model:x="model.x"
          v-model:y="model.y"
          v-model:width="model.width"
          v-model:height="model.height">
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
    setup () {
      return { model }
    },
  })

  const object = screen.queryByTestId('pdf-object')

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

  await triggerDragStart()

  expect(object).toHaveStyle({
    position : 'fixed',
    transform: 'translate(100px, 400px) scale(1)',
  })

  expect(model.x).toBe(100)
  expect(model.y).toBe(400)

  await triggerDragMove({ dx: 300, dy: 300 })

  expect(object).toHaveStyle({
    position : 'fixed',
    transform: 'translate(400px, 700px) scale(1)',
  })

  await triggerDragEnd()

  expect(object).toHaveStyle({ position: 'absolute' })
  expect(model.x).toBe(50)
  expect(model.y).toBe(50)
  expect(model.page).toBe(1)
})

it('should show debugger if prop `debug` was provided', async () => {
  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object>
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
        <pdf-object debug>
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
  })

  const pdfDebugger = screen.queryByTestId('pdf-debugger')

  await delay(0) // Waiting for rendering done

  expect(pdfDebugger).toBeInTheDocument()
})

it('should focus to object if prop `autofocus` was provided', async () => {
  const screen = render({
    components: { PdfObject, PdfObjects },
    template  : `
      <pdf-objects>
        <div class="pdfViewer" data-testid="viewer" style="position:absolute;top:0;left:0;width:500px;height:500px;overflow-y:auto;">
          <div class="page" data-testid="page-1" data-page-number="1" style="width:300px;height:400px;"></div>
          <div class="page" data-testid="page-2" data-page-number="2" style="width:300px;height:400px;"></div>
        </div>
        <pdf-object autofocus>
          <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
        </pdf-object>
      </pdf-objects>
    `,
  })

  const object = screen.queryByTestId('pdf-object')
  const focus  = vi.spyOn(pdfUtils, 'focus')

  await delay(0) // Waiting for rendering done

  expect(focus).toBeCalledWith(object)
})
