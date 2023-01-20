import {
  fireEvent,
  render,
  within,
} from '@testing-library/vue'
import { vi } from 'vitest'
import { nextTick, ref } from 'vue-demi'
import Pagination from './Pagination.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination />',
  })

  const pagination = screen.getByTestId('pagination')

  expect(pagination).toBeInTheDocument()
  expect(pagination).toHaveClass('pagination')
})

it('should render pagination items if "total" props is provided', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" />',
  })

  const pagination      = screen.getByTestId('pagination')
  const paginationItems = screen.getAllByTestId('pagination-item')

  expect(pagination).toBeInTheDocument()
  expect(paginationItems).toHaveLength(5)
})

it('should render only one page item if "total" props less than provided or default "per-page" props', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="10" :per-page="25" />',
  })

  const paginationItems = screen.getAllByTestId('pagination-item')

  expect(paginationItems).toHaveLength(1)
})

it('should render ellipsis if total page exceeds the maximum display limit', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="150" />', // default perPage is 10
  })

  const pagination = screen.getByTestId('pagination')
  const ellipsis   = screen.queryByText('...')

  expect(pagination).toBeInTheDocument()
  expect(ellipsis).toBeInTheDocument()
})

it('should render previous and next navigation, if props "variant" set to "short"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" variant="short">',
  })

  const pagination     = screen.getByTestId('pagination')
  const prevNavigation = screen.getByTestId('pagination-nav-prev')
  const nextNavigation = screen.getByTestId('pagination-nav-next')

  expect(pagination).toBeInTheDocument()
  expect(prevNavigation).toBeInTheDocument()
  expect(nextNavigation).toBeInTheDocument()
})

it('should render previous, next, first, and last navigation, if props "variant" set to "far"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" variant="far" />',
  })

  const prevNavigation  = screen.getByTestId('pagination-nav-prev')
  const nextNavigation  = screen.getByTestId('pagination-nav-next')
  const firstNavigation = screen.getByTestId('pagination-nav-first')
  const lastNavigation  = screen.getByTestId('pagination-nav-last')

  expect(prevNavigation).toBeInTheDocument()
  expect(nextNavigation).toBeInTheDocument()
  expect(firstNavigation).toBeInTheDocument()
  expect(lastNavigation).toBeInTheDocument()
})

it('should not render all navigations, if props "variant" set to "none"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" variant="none" />',
  })

  const prevNavigation  = screen.queryByTestId('pagination-nav-prev')
  const nextNavigation  = screen.queryByTestId('pagination-nav-next')
  const firstNavigation = screen.queryByTestId('pagination-nav-first')
  const lastNavigation  = screen.queryByTestId('pagination-nav-last')

  expect(prevNavigation).not.toBeInTheDocument()
  expect(nextNavigation).not.toBeInTheDocument()
  expect(firstNavigation).not.toBeInTheDocument()
  expect(lastNavigation).not.toBeInTheDocument()
})

it('should render previous and next navigation only, if props "navigation-only" is provided and props "variant" set to "short"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" variant="short" navigation-only>',
  })

  const pagination     = screen.getByTestId('pagination')
  const prevNavigation = screen.getByTestId('pagination-nav-prev')
  const nextNavigation = screen.getByTestId('pagination-nav-next')

  expect(pagination).toHaveClass('pagination--navonly')
  expect(prevNavigation).toBeInTheDocument()
  expect(nextNavigation).toBeInTheDocument()
})

it('should render all navigations only, if props "navigation-only" is provided and props "variant" set to "far"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" variant="far" navigation-only>',
  })

  const prevNavigation  = screen.getByTestId('pagination-nav-prev')
  const nextNavigation  = screen.getByTestId('pagination-nav-next')
  const firstNavigation = screen.queryByTestId('pagination-nav-first')
  const lastNavigation  = screen.queryByTestId('pagination-nav-last')

  expect(prevNavigation).toBeInTheDocument()
  expect(nextNavigation).toBeInTheDocument()
  expect(firstNavigation).toBeInTheDocument()
  expect(lastNavigation).toBeInTheDocument()
})

it('should not render anything, if props "navigation-only" is provided and props "variant" set to "none"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" variant="none" navigation-only />',
  })

  const paginationItems = screen.queryAllByTestId('pagination-item')
  const prevNavigation  = screen.queryByTestId('pagination-nav-prev')
  const nextNavigation  = screen.queryByTestId('pagination-nav-next')
  const firstNavigation = screen.queryByTestId('pagination-nav-first')
  const lastNavigation  = screen.queryByTestId('pagination-nav-last')

  expect(paginationItems).toHaveLength(0)
  expect(prevNavigation).not.toBeInTheDocument()
  expect(nextNavigation).not.toBeInTheDocument()
  expect(firstNavigation).not.toBeInTheDocument()
  expect(lastNavigation).not.toBeInTheDocument()
})

it('should render pagination detail, if props "show-detail" is provided', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" show-detail />',
  })

  const paginationCount  = screen.getByTestId('pagination-count')
  const paginationOption = screen.getByTestId('pagination-option')
  const countLabel       = screen.getByText('1 - 10 of 50')
  const rowsLabel        = screen.queryByText('Show rows')

  expect(paginationCount).toBeInTheDocument()
  expect(paginationOption).toBeInTheDocument()
  expect(countLabel).toBeInTheDocument()
  expect(rowsLabel).toBeInTheDocument()
})

it('should render quick jump, if props "quick-jump" is provided', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" quick-jump />',
  })

  const quickJump = screen.getByTestId('pagination-quickjump')

  expect(quickJump).toBeInTheDocument()
})

it('should control total page via props "per-page"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="60" :per-page="10" />',
  })

  const pageItems = screen.queryAllByTestId('pagination-item')

  expect(pageItems).toHaveLength(6)
  expect(pageItems.at(0).textContent).toBe('1')
  expect(pageItems.at(5).textContent).toBe('6')
})

it('should control maximum total page displayed via props "display-limit"', async () => {
  const perPage = ref(10)
  const screen  = render({
    components: { Pagination },
    template  : '<Pagination :total="150" v-model:per-page="perPage" :display-limit="7" />',
    setup () {
      return { perPage }
    },
  })

  let pageItems = screen.queryAllByTestId('pagination-item')
  let ellipsis  = screen.queryAllByText('...')

  expect(pageItems).toHaveLength(7)
  expect(ellipsis).toHaveLength(1) // display ellipsis if total page count > max limit

  perPage.value = 25
  await nextTick()

  pageItems = screen.queryAllByTestId('pagination-item')
  ellipsis  = screen.queryAllByText('...')

  expect(pageItems).toHaveLength(6)
  expect(ellipsis).toHaveLength(0) // no ellipsis if total page count < max limit
})

it('should binding current page into "v-model" and emit event "change"', async () => {
  const model  = ref(1)
  const spy    = vi.fn()
  const screen = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" variant="far" :total="150" :per-page="10" @change="onPageChange" />',
    methods   : { onPageChange: spy },
    setup () {
      return { model }
    },
  })

  const paginationItems = screen.queryAllByTestId('pagination-item')
  const prevNagiation   = screen.getByTestId('pagination-nav-prev')

  await fireEvent.click(paginationItems.at(3))

  expect(model.value).toBe(4)
  expect(spy).toBeCalled()

  await fireEvent.click(prevNagiation)

  expect(model.value).toBe(3)
  expect(spy).toBeCalled()
})

it('should bind total page to "v-model", if total page count less than current page', async () => {
  const model          = ref(1)
  const perPage        = ref(10)
  const perPageOptions = ref([
    10,
    20,
    30,
  ])
  const screen         = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" v-model:per-page="perPage" :per-page-options="perPageOptions" :total="100" show-detail />',
    setup () {
      return {
        model, perPage, perPageOptions,
      }
    },
  })

  let paginationItems    = screen.queryAllByTestId('pagination-item')
  const paginationOption = screen.getByTestId('pagination-option')
  const input            = within(paginationOption).getByTestId('select-search')

  expect(paginationItems).toHaveLength(10)

  model.value = 10

  input.focus()
  await nextTick()

  expect(model.value).toBe(10)

  const items = within(paginationOption).queryAllByTestId('select-item')

  await fireEvent.click(items.at(1))

  paginationItems = screen.queryAllByTestId('pagination-item')

  expect(paginationItems).toHaveLength(5)
  expect(model.value).toBe(5)
})

it('should not change "v-model", if ellipsis is clicked', async () => {
  const model  = ref(1)
  const screen = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" :total="150" :per-page="10" />',
    setup () {
      return { model }
    },
  })

  const paginationItems = screen.queryAllByTestId('pagination-item')

  await fireEvent.click(paginationItems.at(7)) // ellipsis item

  expect(model.value).toBe(1)
})

it('should binding current page into "v-model" and emit event "change" with quickjump mode', async () => {
  const model  = ref(1)
  const spy    = vi.fn()
  const screen = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" :total="50" :per-page="10" quickJump @change="onPageChange" />',
    methods   : { onPageChange: spy },
    setup () {
      return { model }
    },
  })

  const pageOption = screen.queryByTestId('pagination-quickjump')
  const input      = within(pageOption).getByTestId('select-search')

  input.focus()
  await nextTick()

  const items = within(pageOption).queryAllByTestId('select-item')

  await fireEvent.click(items.at(3))

  expect(model.value).toBe(4)
  expect(spy).toBeCalled()
})

it('should binding "per-page" props when perPage options is changed, if "show-detail" provided', async () => {
  const model          = ref(1)
  const perPage        = ref(10)
  const perPageOptions = ref([
    10,
    20,
    30,
  ])
  const screen         = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" v-model:per-page="perPage" :per-page-options="perPageOptions" :total="100" show-detail />',
    setup () {
      return {
        model, perPage, perPageOptions,
      }
    },
  })

  const paginationOption = screen.getByTestId('pagination-option')
  const input            = within(paginationOption).getByTestId('select-search')

  input.focus()
  await nextTick()

  const items = within(paginationOption).queryAllByTestId('select-item')

  await fireEvent.click(items.at(1))

  expect(perPage.value).toBe(20)
})

it('should have attribute "active" with value is "true" at current page', () => {
  const model  = ref(1)
  const screen = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" :total="50" :per-page="10" />',
    setup () {
      return { model }
    },
  })

  const paginationItems = screen.queryAllByTestId('pagination-item')

  expect(paginationItems.at(0)).toHaveAttribute('active', 'true')
})

it('should be able to change page label via props "page-label" for quickjump mode', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" quick-jump page-label="Halaman" />',
  })

  const quickJump = screen.getByTestId('pagination-quickjump')
  const pageText  = screen.queryByText(/Halaman/)

  expect(quickJump).toBeInTheDocument()
  expect(quickJump).toHaveClass('pagination__quickjump')
  expect(pageText).not.toBeNull()
})

it('should be able to change show row label via props "show-rows-label", if props "show-detail" is provided', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination :total="50" show-detail show-rows-label="Show lists" />',
  })

  const rowsLabel = screen.queryByText('Show lists')

  expect(rowsLabel).toBeInTheDocument()
})

it('should be able to change previous and next navigation icon to text via props "navigation-text", with default label is "Previous" and "Next"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination navigation-text :total="50" />',
  })

  const prevNavLabel = screen.queryByText('Previous')
  const nextNavLabel = screen.queryByText('Next')

  expect(prevNavLabel).toBeInTheDocument()
  expect(nextNavLabel).toBeInTheDocument()
})

it('should be able to change default navigation label via props "prev-nav-label" and "next-nav-label", if props "navigation-text" is provided', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination navigation-text prev-nav-label="Sebelum" next-nav-label="Sesudah" :total="50" />',
  })

  const prevNavLabel = screen.queryByText('Sebelum')
  const nextNavLabel = screen.queryByText('Sesudah')

  expect(prevNavLabel).toBeInTheDocument()
  expect(nextNavLabel).toBeInTheDocument()
})

it('should be able to change first and last navigation label via props "first-nav-label" and "last-nav-label"', () => {
  const screen = render({
    components: { Pagination },
    template  : '<Pagination variant="far" first-nav-label="Awal" last-nav-label="Akhir" :total="50" />',
  })

  const firstNavLabel = screen.queryByText('Awal')
  const lastNavLabel  = screen.queryByText('Akhir')

  expect(firstNavLabel).toBeInTheDocument()
  expect(lastNavLabel).toBeInTheDocument()
})

it('should be able to add content previous or next navigation content via slot "prev-navigation" and "next-navigation"', () => {
  const screen = render({
    components: { Pagination },
    template  : `
      <Pagination :total="50">
        <template #prev-navigation>
          Previous
        </template>
        <template #next-navigation>
          Next
        </template>
      </Pagination>
    `,
  })

  const prevNavigation = screen.getByTestId('pagination-nav-prev')
  const nextNavigation = screen.getByTestId('pagination-nav-next')
  const prevText       = screen.getByText('Previous')
  const nextText       = screen.getByText('Next')

  expect(prevNavigation).toBeInTheDocument()
  expect(nextNavigation).toBeInTheDocument()
  expect(prevText).toBeInTheDocument()
  expect(nextText).toBeInTheDocument()
})

it('should be able to add first or last navigation content via slot "first-navigation" and "last-navigation"', () => {
  const screen = render({
    components: { Pagination },
    template  : `
      <Pagination :total="50" variant="far">
        <template #first-navigation>
          Pertama
        </template>
        <template #last-navigation>
          Terakhir
        </template>
      </Pagination>
    `,
  })

  const firstNavigation = screen.getByTestId('pagination-nav-first')
  const lastNavigation  = screen.getByTestId('pagination-nav-last')
  const firstText       = screen.getByText('Pertama')
  const lastText        = screen.getByText('Terakhir')

  expect(firstNavigation).toBeInTheDocument()
  expect(lastNavigation).toBeInTheDocument()
  expect(firstText).toBeInTheDocument()
  expect(lastText).toBeInTheDocument()
})

it('should be able to add pagination count content via slot "pagination-count"', () => {
  const screen = render({
    components: { Pagination },
    template  : `
      <Pagination :total="50" show-detail>
        <template #pagination-count="{ range, total }">
          {{ range[0] }} - {{ range[1]}} dari {{ total }} data
        </template>
      </Pagination>
    `,
  })

  const countText = screen.getByText('1 - 10 dari 50 data')

  expect(countText).toBeInTheDocument()
})

it('pagination count should updated, if current page is changed', async () => {
  const model  = ref(1)
  const screen = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" :total="50" show-detail />',
    setup () {
      return { model }
    },
  })

  const countText = screen.getByTestId('pagination-count')

  expect(countText.textContent).toBe('1 - 10 of 50')

  model.value = 2
  await nextTick()

  expect(countText.textContent).toBe('11 - 20 of 50')
})

it('navigation should have attribute "disabled", if current page at the beginning or last', async () => {
  const model  = ref(1)
  const screen = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" :total="50" :per-page="10" />',
    setup () {
      return { model }
    },
  })

  const prevNavigation = screen.getByTestId('pagination-nav-prev')
  const nextNavigation = screen.getByTestId('pagination-nav-next')

  expect(prevNavigation).toHaveAttribute('disabled')
  expect(nextNavigation).not.toHaveAttribute('disabled')

  model.value = 5
  await nextTick()

  expect(prevNavigation).not.toHaveAttribute('disabled')
  expect(nextNavigation).toHaveAttribute('disabled')
})

it('should have not able to click navigation if disabled', async () => {
  const model   = ref(1)
  const perPage = ref(10)
  const screen  = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" v-model:per-page="10" :total="50" />',
    setup () {
      return { model, perPage }
    },
  })

  const prevNavigation = screen.getByTestId('pagination-nav-prev')
  const nextNavigation = screen.getByTestId('pagination-nav-next')

  expect(prevNavigation).toHaveAttribute('disabled')
  expect(model.value).toBe(1)

  await fireEvent.click(prevNavigation)

  expect(model.value).toBe(1)

  model.value = 5
  await nextTick()

  expect(nextNavigation).toHaveAttribute('disabled')

  await fireEvent.click(nextNavigation)

  expect(model.value).toBe(5)
})

it('should go to first or last page, if first or last navigation is clicked', async () => {
  const model  = ref(1)
  const spy    = vi.fn()
  const screen = render({
    components: { Pagination },
    template  : '<Pagination v-model="model" variant="far" :total="50" @change="onPageChange">',
    methods   : { onPageChange: spy },
    setup () {
      return { model }
    },
  })

  const firstNavigation = screen.getByTestId('pagination-nav-first')
  const lastNavigation  = screen.getByTestId('pagination-nav-last')
  const pageItems       = screen.queryAllByTestId('pagination-item')

  expect(model.value).toBe(1)
  expect(spy).not.toBeCalled()

  await fireEvent.click(lastNavigation)

  expect(model.value).toBe(5)
  expect(spy).toBeCalled()
  expect(pageItems.at(4)).toHaveAttribute('active', 'true')

  await fireEvent.click(firstNavigation)

  expect(model.value).toBe(1)
  expect(spy).toBeCalled()
  expect(pageItems.at(0)).toHaveAttribute('active', 'true')
})
