import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { ref, nextTick } from 'vue-demi'
import pContextualBar from './ContextualBar.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar>
        Hey!
      </p-contextual-bar>
    `,
  })

  const bar  = screen.queryByTestId('contextual-bar')
  const text = screen.queryByText('Hey!')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar', 'contextual-bar--info')
  expect(text).toBeInTheDocument()
})

it('should have `error` style if variant set to `error`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar variant="error">
        Hey!
      </p-contextual-bar>
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
      <p-contextual-bar align="center">
        Hey!
      </p-contextual-bar>
    `,
  })

  const bar = screen.queryByTestId('contextual-bar')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar', 'contextual-bar--align-center')
})

it('should be abble to add message content via prop `message`', () => {
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar message="Hey!">
      </p-contextual-bar>
    `,
  })

  const bar  = screen.queryByTestId('contextual-bar-content')
  const icon = screen.queryByTestId('contextual-bar-icon')
  const text = screen.queryByText('Hey!')

  expect(bar).toBeInTheDocument()
  expect(bar).toHaveClass('contextual-bar__content--icon')
  expect(icon).not.toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('should dismissed when close button clicked', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pContextualBar },
    template  : `
      <p-contextual-bar v-model="model">
        Hey!
      </p-contextual-bar>
    `,
    setup () {
      return { model }
    },
  })

  const bar   = screen.queryByTestId('contextual-bar')
  const text  = screen.queryByText('Hey!')
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
      <p-contextual-bar v-model="model" @close="onClose">
        Hey!
      </p-contextual-bar>
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
      <p-contextual-bar :dismissable="false">
        Hello
      </p-contextual-bar>
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
      <p-contextual-bar v-model="model">
        Hello
      </p-contextual-bar>
    `,
    setup () {
      return { model }
    },
  })

  let bar = screen.queryByTestId('contextual-bar')
  expect(bar).toHaveAttribute('style', 'transform: translateY(-0px); display: none;')

  model.value = true
  await nextTick()

  bar = screen.queryByTestId('contextual-bar')
  expect(bar).toHaveAttribute('style', 'transform: translateY(-0px);')
})
