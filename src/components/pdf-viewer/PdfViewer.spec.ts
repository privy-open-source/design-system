import { fireEvent, render } from '@testing-library/vue'
import * as useViewer from './__mocks__/use-viewer'
import PdfViewer from './PdfViewer.vue'
import { vi } from 'vitest'
import { delay } from 'nanodelay'
import { nextTick, ref } from 'vue-demi'

vi.mock('../pdf-object/utils/use-drop.ts', () => ({ default: vi.fn(() => ref(true)) }))

vi.mock('./utils/use-viewer.ts', () => useViewer)

vi.mock('./utils/pdfjs.ts', () => ({ getVersion: vi.fn(() => '3.10.x') }))

it('should rendery properly', () => {
  const screen = render({
    components: { PdfViewer },
    template  : '<pdf-viewer />',
  })

  const viewer = screen.queryByTestId('pdf-viewer')

  expect(viewer).toBeInTheDocument()
})

it('should load document from src url', async () => {
  const screen = render({
    components: { PdfViewer },
    template  : '<pdf-viewer src="http://sample.pdf" />',
  })

  const viewer = screen.queryByTestId('pdf-viewer')

  await delay(2)

  expect(viewer).toBeInTheDocument()
  expect(useViewer.openDoc).lastCalledWith('http://sample.pdf', undefined, {})
})

it('should load document with password if prop password given', async () => {
  const screen = render({
    components: { PdfViewer },
    template  : `
      <pdf-viewer
        src="http://sample.pdf"
        password="123456"
      />
      `,
  })

  const viewer = screen.queryByTestId('pdf-viewer')

  await delay(2)

  expect(viewer).toBeInTheDocument()
  expect(useViewer.openDoc).lastCalledWith('http://sample.pdf', '123456', {})
})

it('should have style layout fit if prop `layout` set to "fit"', () => {
  const screen = render({
    components: { PdfViewer },
    template  : '<pdf-viewer layout="fit" />',
  })

  const viewer = screen.queryByTestId('pdf-viewer')

  expect(viewer).toBeInTheDocument()
  expect(viewer).toHaveClass('pdf-viewer--layout-fit')
})

it('should reload document if src changed', async () => {
  vi.useFakeTimers()

  const src      = ref('http://sample.pdf')
  const password = ref('')
  const screen   = render({
    components: { PdfViewer },
    template  : '<pdf-viewer :src="src" :password="password" />',
    setup () {
      return { src, password }
    },
  })

  const viewer = screen.queryByTestId('pdf-viewer')

  vi.advanceTimersByTime(2)

  expect(viewer).toBeInTheDocument()
  expect(useViewer.openDoc).lastCalledWith('http://sample.pdf', '', {})

  src.value = 'http://sample-3.pdf'
  await nextTick()

  vi.advanceTimersByTime(502) // skip debounce

  expect(useViewer.openDoc).lastCalledWith('http://sample-3.pdf', '', {})

  password.value = '123456'
  await nextTick()

  vi.advanceTimersByTime(502) // skip debounce

  expect(useViewer.openDoc).lastCalledWith('http://sample-3.pdf', '123456', {})

  vi.useRealTimers()
})

it('should show error page if got error when load the document', async () => {
  const screen = render({
    components: { PdfViewer },
    template  : '<pdf-viewer src="http://error.pdf" />',
  })

  const viewer    = screen.queryByTestId('pdf-viewer')
  const errorPage = screen.queryByTestId('pdf-error')

  await delay(2)

  expect(viewer).toBeInTheDocument()
  expect(errorPage).toBeInTheDocument()
  expect(errorPage).toBeVisible()
})

it('should emit error-password when document is protected but no password provided', async () => {
  const onErrorPassword = vi.fn()
  const screen          = render({
    components: { PdfViewer },
    template  : `
      <pdf-viewer
        src="http://protected.pdf"
        @error-password="onErrorPassword"
      />`,
    setup () {
      return { onErrorPassword }
    },
  })

  const viewer    = screen.queryByTestId('pdf-viewer')
  const errorPage = screen.queryByTestId('pdf-error')

  await delay(2)

  expect(viewer).toBeInTheDocument()
  expect(errorPage).toBeInTheDocument()
  expect(errorPage).toBeVisible()
  expect(onErrorPassword).toBeCalled()
})

it('should able to pass option when open document using props `config`', async () => {
  const screen = render({
    components: { PdfViewer },
    template  : `<pdf-viewer
      :config="{ disableStream: true, disableRange: true }"
      src="http://sample.pdf" />`,
  })

  const viewer = screen.queryByTestId('pdf-viewer')

  await delay(2)

  expect(viewer).toBeInTheDocument()
  expect(useViewer.openDoc).lastCalledWith('http://sample.pdf', undefined, { disableStream: true, disableRange: true })
})

it('should expose navigation in slot', async () => {
  const page   = ref(1)
  const scale  = ref(1)
  const screen = render({
    components: { PdfViewer },
    template  : `
      <pdf-viewer
        v-model:page="page"
        v-model:scale="scale"
        src="http://sample.pdf"
        password="123456"
      >
        <template #header="{ zoomIn, zoomOut, next, prev, first, last }">
          <button data-testid="zoom-in" @click="zoomIn">
            zoom in
          </button>
          <button data-testid="zoom-out" @click="zoomOut">
            zoom out
          </button>
          <button data-testid="next" @click="next">
            next
          </button>
          <button data-testid="prev" @click="prev">
            prev
          </button>
          <button data-testid="first" @click="first">
            first
          </button>
          <button data-testid="last" @click="last">
            last
          </button>
        </template>
      </pdf-viewer>
    `,
    setup () {
      return {
        page,
        scale,
      }
    },
  })

  const viewer = screen.queryByTestId('pdf-viewer')

  await delay(2)

  expect(viewer).toBeInTheDocument()

  const zoomIn  = screen.queryByTestId('zoom-in')
  const zoomOut = screen.queryByTestId('zoom-out')
  const next    = screen.queryByTestId('next')
  const prev    = screen.queryByTestId('prev')
  const first   = screen.queryByTestId('first')
  const last    = screen.queryByTestId('last')

  await fireEvent.click(zoomIn)

  expect(scale.value).toBe(1.1)

  await fireEvent.click(zoomOut)
  await fireEvent.click(zoomOut)

  expect(scale.value).toBe(0.9)

  await fireEvent.click(next)
  await fireEvent.click(next)

  expect(page.value).toBe(3)

  await fireEvent.click(prev)

  expect(page.value).toBe(2)

  await fireEvent.click(first)

  expect(page.value).toBe(1)

  await fireEvent.click(last)

  expect(page.value).toBe(5)
})

it('should be able to change num-of-pages, first and last navigation label via props "num-of-pages-nav-label", "first-nav-label" and "last-nav-label"', () => {
  const screen = render({
    components: { PdfViewer },
    template  : `
      <pdf-viewer
          src="http://sample.pdf"
          first-nav-label="Awal" 
          last-nav-label="Akhir" 
          num-of-pages-nav-label="dari"
      />
    `,
  })

  const firstNavLabel   = screen.queryByText('Awal')
  const lastNavLabel    = screen.queryByText('Akhir')
  const numOfPagesLabel = screen.queryByText(/dari/i)

  expect(firstNavLabel).toBeInTheDocument()
  expect(lastNavLabel).toBeInTheDocument()
  expect(numOfPagesLabel).toBeInTheDocument()
})
