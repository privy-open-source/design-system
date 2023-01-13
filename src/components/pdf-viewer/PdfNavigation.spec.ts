import { render, fireEvent } from '@testing-library/vue'
import PdfNavigation from './PdfNavigation.vue'
import { provide, ref } from 'vue-demi'
import { PDF_VIEWER_CONTEXT } from '.'

function createContext () {
  const page      = ref(1)
  const scale     = ref(1)
  const totalPage = ref(5)

  return {
    page,
    scale,
    totalPage,
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
