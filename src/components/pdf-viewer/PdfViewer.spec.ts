import { render } from '@testing-library/vue'
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
  // eslint-disable-next-line unicorn/no-useless-undefined
  expect(useViewer.openDoc).lastCalledWith('http://sample.pdf', undefined)
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
  expect(useViewer.openDoc).lastCalledWith('http://sample.pdf', '123456')
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
  expect(useViewer.openDoc).lastCalledWith('http://sample.pdf', '')

  src.value = 'http://sample-3.pdf'
  await nextTick()

  vi.advanceTimersByTime(502) // skip debounce

  expect(useViewer.openDoc).lastCalledWith('http://sample-3.pdf', '')

  password.value = '123456'
  await nextTick()

  vi.advanceTimersByTime(502) // skip debounce

  expect(useViewer.openDoc).lastCalledWith('http://sample-3.pdf', '123456')

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
