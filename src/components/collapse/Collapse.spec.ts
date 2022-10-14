import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import { useMediaQuery, setScreenWidth } from './__mocks__/use-media-query'
import { nextTick, ref } from 'vue-demi'
import type * as VueUse from '@vueuse/core'
import pCollapse from './Collapse.vue'
import pNavbar from '../navbar/Navbar.vue'
import { delay } from 'nanodelay'

vi.mock('@vueuse/core', async () => {
  const vueuse = await vi.importActual('@vueuse/core')

  return {
    ...vueuse as typeof VueUse,
    useMediaQuery,
  }
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should rendered properly without any props', () => {
  const screen = render({
    components: { pCollapse },
    template  : `
      <p-collapse>
        Hey there!
      </p-collapse>
    `,
  })

  const collapse = screen.queryByTestId('collapse')
  const text     = screen.queryByText('Hey there!')

  expect(collapse).toBeInTheDocument()
  expect(collapse).toHaveClass('collapse')
  expect(text).toBeInTheDocument()
})

it('should rendered properly without any props', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pCollapse },
    template  : `
      <p-collapse v-model="model">
      </p-collapse>
    `,
    setup () {
      return { model }
    },
  })

  let collapse = screen.queryByTestId('collapse')

  expect(collapse).toBeInTheDocument()
  expect(collapse).not.toBeVisible()

  model.value = true

  await nextTick()

  collapse = screen.queryByTestId('collapse')
  expect(collapse).toBeVisible()
  expect(collapse).toHaveClass('collapse--show')

  model.value = false

  await nextTick()

  collapse = screen.queryByTestId('collapse')
  expect(collapse).not.toBeVisible()
})

it('should have style navbar-collapse via prop `is-nav`', () => {
  const screen = render({
    components: { pCollapse },
    template  : `
      <p-collapse is-nav>
        Hey there!
      </p-collapse>
    `,
  })

  const collapse = screen.queryByTestId('collapse')

  expect(collapse).toBeInTheDocument()
  expect(collapse).toHaveClass('navbar--collapse')
})

it('Show content inside collapse automatically based on breakpoint `lg` via prop `toggleable`', async () => {
  const screen = render({
    components: { pNavbar, pCollapse },
    template  : `
      <p-navbar toggleable="lg">
        <p-collapse is-nav>
          <span data-testid="collapse-content">hey</span>
        </p-collapse>
      </p-navbar>
    `,
  })

  await setScreenWidth(1080)
  await delay(0)

  const collapse = screen.queryByTestId('collapse')
  const content  = screen.queryAllByTestId('collapse-content')

  expect(collapse).toBeInTheDocument()
  expect(content.at(0)).toBeVisible()
})

it('Show content inside collapse automatically based on breakpoint `md` via prop `toggleable`', async () => {
  const screen = render({
    components: { pNavbar, pCollapse },
    template  : `
      <p-navbar toggleable="md">
        <p-collapse is-nav>
          <span data-testid="collapse-content">hey</span>
        </p-collapse>
      </p-navbar>
    `,
  })

  await setScreenWidth(800)
  await delay(0)

  const collapse = screen.queryByTestId('collapse')
  const content  = screen.queryAllByTestId('collapse-content')

  expect(collapse).toBeInTheDocument()
  expect(content.at(0)).toBeVisible()
})

it('Show content inside collapse automatically based on breakpoint `sm` via prop `toggleable`', async () => {
  const screen = render({
    components: { pNavbar, pCollapse },
    template  : `
      <p-navbar toggleable="sm">
        <p-collapse is-nav>
          <span data-testid="collapse-content">hey</span>
        </p-collapse>
      </p-navbar>
    `,
  })

  await setScreenWidth(650)
  await delay(0)

  const collapse = screen.queryByTestId('collapse')
  const content  = screen.queryAllByTestId('collapse-content')

  expect(collapse).toBeInTheDocument()
  expect(content.at(0)).toBeVisible()
})

it('should show content following v-model if breakpoint below value of prop `toggleable`', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pNavbar, pCollapse },
    template  : `
      <p-navbar toggleable="lg">
        <p-collapse is-nav v-model="model">
          <span data-testid="collapse-content">hey</span>
        </p-collapse>
      </p-navbar>
    `,
    setup () {
      return { model }
    },
  })

  await setScreenWidth(700)
  await delay(0)

  const collapse = screen.queryByTestId('collapse')
  let content    = screen.queryAllByTestId('collapse-content')

  expect(collapse).toBeInTheDocument()
  expect(content.at(0)).not.toBeVisible()

  model.value = true
  await nextTick()

  content = screen.queryAllByTestId('collapse-content')

  expect(content.at(0)).toBeVisible()
})
