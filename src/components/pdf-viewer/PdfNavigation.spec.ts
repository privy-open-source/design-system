import { render, fireEvent } from '@testing-library/vue'
import PdfNavigation from './PdfNavigation.vue'
import {
  nextTick,
  provide,
  ref,
} from 'vue-demi'
import { PDF_VIEWER_CONTEXT } from '.'

function createContext () {
  const page      = ref(1)
  const scale     = ref(1)
  const totalPage = ref(5)

  function zoomIn () {
    scale.value = (Math.round(scale.value / 0.1) * 0.1) + 0.1
  }

  function zoomOut () {
    scale.value = (Math.round(scale.value / 0.1) * 0.1) - 0.1
  }

  function next () {
    page.value++
  }

  function prev () {
    page.value--
  }

  return {
    page,
    scale,
    totalPage,
    zoomIn,
    zoomOut,
    next,
    prev,
  }
}

it('should mounted properly', () => {
  const screen = render({
    components: { PdfNavigation },
    template  : '<PdfNavigation />',
  })

  const navigation = screen.queryByTestId('pdf-navigation')

  expect(navigation).toBeInTheDocument()
})

it('should changed zoom value if zoomIn or ZoomOut clicked', async () => {
  const context = createContext()
  const screen  = render({
    components: { PdfNavigation },
    template  : '<PdfNavigation />',
    setup () {
      provide(PDF_VIEWER_CONTEXT, context)

      return {}
    },
  })

  const zoomIn  = screen.queryByTestId('pdf-zoom-in')
  const zoomOut = screen.queryByTestId('pdf-zoom-out')

  await fireEvent.click(zoomIn)

  expect(context.scale.value).toBe(1.1)

  await fireEvent.click(zoomOut)
  await fireEvent.click(zoomOut)

  expect(context.scale.value).toBe(0.9)
})

it('should changed page value if Next or Prev button clicked', async () => {
  const context = createContext()
  const screen  = render({
    components: { PdfNavigation },
    template  : '<PdfNavigation />',
    setup () {
      provide(PDF_VIEWER_CONTEXT, context)

      return {}
    },
  })

  const nextBtn = screen.queryByTestId('pdf-next')
  const prevbtn = screen.queryByTestId('pdf-prev')

  await fireEvent.click(nextBtn)
  await fireEvent.click(nextBtn)

  expect(context.page.value).toBe(3)

  await fireEvent.click(prevbtn)

  expect(context.page.value).toBe(2)
})

it('should changed page value if page selection was selected', async () => {
  const context = createContext()
  const screen  = render({
    components: { PdfNavigation },
    template  : '<PdfNavigation />',
    setup () {
      provide(PDF_VIEWER_CONTEXT, context)

      return {}
    },
  })

  const input = screen.queryByTestId('select-search')

  input.focus()
  await nextTick()

  const items = screen.queryAllByTestId('select-item')

  await fireEvent.click(items.at(2))

  expect(context.page.value).toBe(3)
})

it('should be able to change num-of-pages, first and last navigation label via props "num-of-pages-nav-label", "first-nav-label" and "last-nav-label"', () => {
  const screen = render({
    components: { PdfNavigation },
    template  : '<PdfNavigation first-nav-label="Awal" last-nav-label="Akhir" num-of-pages-nav-label="dari" />',
  })

  const firstNavLabel   = screen.queryByText('Awal')
  const lastNavLabel    = screen.queryByText('Akhir')
  const numOfPagesLabel = screen.queryByText(/dari/i)

  expect(firstNavLabel).toBeInTheDocument()
  expect(lastNavLabel).toBeInTheDocument()
  expect(numOfPagesLabel).toBeInTheDocument()
})
