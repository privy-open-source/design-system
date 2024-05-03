import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import {
  ref,
  nextTick,
} from 'vue-demi'
import pContextualBar from './ContextualBar.vue'
import pButton from '../button/Button.vue'
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
import { until } from '@vueuse/core'

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
  expect(bar).toHaveClass('contextual-bar', 'contextual-bar--info')
})

it('should have `dark` style if variant set to `dark`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar state="error" />
    `,
  })

  const bar = screen.queryByTestId('contextual-bar')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar', 'contextual-bar--error')
  expect(bar).not.toHaveClass('contextual-bar--info')
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

it('should be able to add title content via prop `title`', () => {
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

it('should be able to add title content via slot `title`', () => {
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

it('should be able to add additional message via prop `message`', () => {
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

it('should be able to add additional message via slot `message`', () => {
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

it('should be able to add custom background via prop `background-url`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar background-url="assets/images/img-background-contextualbar.svg" title="hey!" />
    `,
  })

  const bar = screen.queryByTestId('contextual-bar')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar--background-image')
  expect(bar).toHaveStyle({ '--p-contextualbar-bg-image': 'url("assets/images/img-background-contextualbar.svg")' })
})

it('should be able to add icon via slot `icon`', () => {
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

it('should be able to add button action via slot `action`', () => {
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
  const isShow = ref(false)
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar
        v-model="model"
        title="hello"
        :style="{ transitionDuration: '1ms' }"
        @show="isShow = true"
        @hide="isShow = false" />
    `,
    setup () {
      return { model, isShow }
    },
  }, { global: { stubs: { transition: false } } })

  const bar = screen.queryByTestId('contextual-bar') as HTMLDivElement

  expect(bar).not.toBeVisible()
  expect(document.body).toHaveClass('contextual-bar__body')

  model.value = true

  await until(isShow).toBe(true)

  expect(bar).toBeVisible()
  expect(document.body).toHaveClass('contextual-bar__body--active')

  model.value = false

  await until(isShow).toBe(false)

  expect(bar).not.toBeVisible()
  expect(document.body).not.toHaveClass('contextual-bar__body--active')
})
