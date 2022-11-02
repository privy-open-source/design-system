import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { ref, nextTick } from 'vue-demi'
import { useElementBounding, simulateHeightChanged } from './__mocks__/use-element-bounding'
import pContextualBar from './ContextualBar.vue'
import pButton from '../button/Button.vue'
import type * as VueUse from '@vueuse/core'
import IconInfo from '@carbon/icons-vue/lib/information--filled/20'

vi.mock('@vueuse/core', async () => {
  const core = await vi.importActual('@vueuse/core')

  return {
    ...core as typeof VueUse,
    useElementBounding,
  }
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should rendered properly without any props', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar />
    `,
  })

  const bar = screen.queryByTestId('contextual-bar')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar', 'contextual-bar--light')
})

it('should have `dark` style if variant set to `dark`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar variant="dark" />
    `,
  })

  const bar = screen.queryByTestId('contextual-bar')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar', 'contextual-bar--dark')
  expect(bar).not.toHaveClass('contextual-bar--light')
})

it('should have `center` alignment if align set to `center`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar align="center" />
    `,
  })

  const bar = screen.queryByTestId('contextual-bar')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar', 'contextual-bar--align-center')
})

it('should be abble to add title content via prop `title`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar title="Hey!" />
    `,
  })

  const title = screen.queryByTestId('contextual-bar-title')
  const text  = screen.queryByText('Hey!')

  expect(title).toBeInTheDocument()
  expect(title).toHaveClass('contextual-bar__content__title')
  expect(text).toBeInTheDocument()
})

it('should be abble to add title content via slot `title`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar>
        <template #title>
          hey!
        </template>
      </p-contextual-bar>
    `,
  })

  const title = screen.queryByTestId('contextual-bar-title')
  const text  = screen.queryByText('hey!')

  expect(title).toBeInTheDocument()
  expect(title).toHaveClass('contextual-bar__content__title')
  expect(text).toBeInTheDocument()
})

it('should be abble to add additional message via prop `message`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar message="hello" />
    `,
  })

  const message = screen.queryByTestId('contextual-bar-message')
  const wrapper = screen.queryByTestId('contextual-bar-wrapper')
  const text    = screen.queryByText('hello')

  expect(message).toBeInTheDocument()
  expect(message).toHaveClass('contextual-bar__content__message')
  expect(wrapper).toHaveClass('contextual-bar__wrapper', 'contextual-bar__wrapper--with-message')
  expect(text).toBeInTheDocument()
})

it('should be abble to add additional message via slot `message`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar>
        <template #message>
          hello
        </template>
      </p-contextual-bar>
    `,
  })

  const message = screen.queryByTestId('contextual-bar-message')
  const wrapper = screen.queryByTestId('contextual-bar-wrapper')
  const text    = screen.queryByText('hello')

  expect(message).toBeInTheDocument()
  expect(message).toHaveClass('contextual-bar__content__message')
  expect(wrapper).toHaveClass('contextual-bar__wrapper', 'contextual-bar__wrapper--with-message')
  expect(text).toBeInTheDocument()
})

it('should be abble to add custom background via prop `background-url`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar background-url="assets/images/img-background-contextualbar.svg" title="hey!" />
    `,
  })

  const bar = screen.queryByTestId('contextual-bar')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar--background-image')
  expect(bar).toHaveStyle({ 'background-image': 'url("assets/images/img-background-contextualbar.svg")' })
})

it('should be abble to add icon via slot `icon`', () => {
  const screen = render({
    components: { pContextualBar, IconInfo },
    template  : `
      <p-contextual-bar>
        <template #icon>
          <IconInfo />
        </template>
      </p-contextual-bar>
    `,
  })

  const icon = screen.queryByTestId('contextual-bar-icon')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveClass('contextual-bar__icon')
})

it('should be abble to add button action via slot `action`', () => {
  const screen = render({
    components: { pContextualBar, pButton },
    template  : `
      <p-contextual-bar>
        <template #action>
          <p-button color="primary">Button Text</p-button>
        </template>
      </p-contextual-bar>
    `,
  })

  const action  = screen.queryByTestId('contextual-bar-action')
  const wrapper = screen.queryByTestId('contextual-bar-wrapper')

  expect(action).toBeInTheDocument()
  expect(action).toHaveClass('contextual-bar__action')
  expect(wrapper).toHaveClass('contextual-bar__wrapper', 'contextual-bar__wrapper--with-action')
})

it('should dismissed when close button clicked', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar v-model="model" title="hey!" />
    `,
    setup () {
      return { model }
    },
  })

  const bar   = screen.queryByTestId('contextual-bar')
  const text  = screen.queryByText('hey!')
  const close = screen.queryByTestId('contextual-bar-close')

  expect(bar).toBeInTheDocument()
  expect(text).toBeInTheDocument()

  await fireEvent.click(close)

  expect(bar).not.toBeVisible()
  expect(text).not.toBeVisible()
})

it('should emit event `close` if close button clicked', async () => {
  const model  = ref(false)
  const spy    = vi.fn()
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar v-model="model" @close="onClose" title="hey!" />
    `,
    methods: { onClose: spy },
    setup () {
      return { model }
    },
  })

  let bar     = screen.queryByTestId('contextual-bar')
  const close = screen.queryByTestId('contextual-bar-close')

  expect(bar).toBeInTheDocument()
  expect(close).toBeInTheDocument()
  expect(spy).not.toBeCalled()

  model.value = true
  await nextTick()

  bar = screen.queryByTestId('contextual-bar')
  expect(bar).toBeVisible()

  await fireEvent.click(close)
  await delay(0)

  bar = screen.queryByTestId('contextual-bar')
  expect(spy).toBeCalled()
  expect(bar).not.toBeVisible()
})

it('should have no close button if props `dismissable` set to false', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar :dismissable="false" title="hello" />
    `,
  })

  const close = screen.queryByTestId('contextual-bar-close')

  expect(close).not.toBeInTheDocument()
})

it('should have style attribute `display: none` when contextual bar is hide', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar v-model="model" title="hello" />
    `,
    setup () {
      return { model }
    },
  })

  await simulateHeightChanged(0) // Simulate heigth changing

  let bar = screen.queryByTestId('contextual-bar')
  expect(bar).toHaveStyle({ transform: 'translateY(-0px)', display: 'none' })

  model.value = true
  await nextTick()

  await simulateHeightChanged(42)

  bar = screen.queryByTestId('contextual-bar')
  expect(bar).toHaveStyle({ transform: 'translateY(-42px)' })
  expect(document.body).toHaveStyle({ transform: 'translateY(42px)' })
})
