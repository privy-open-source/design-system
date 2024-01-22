import { render, fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import Toast from './Toast.vue'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'
import { markRaw } from 'vue-demi'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should render text properly', () => {
  const screen = render({
    components: { Toast },
    template  : `
      <Toast text="this is text body" />
    `,
  })

  const toast = screen.queryByTestId('toast')
  const text  = screen.queryByText('this is text body')

  expect(toast).toBeInTheDocument()
  expect(toast).toHaveClass('toast')
  expect(text).toBeInTheDocument()
})

it('should dismiss if close button clicked', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Toast },
    template  : `
      <Toast
        text="this is text body"
        @dismissed="onDismissed" />
    `,
    methods: { onDismissed: spy },
  })

  const toast = screen.queryByTestId('toast')
  const close = screen.queryByTestId('toast-close')

  expect(toast).toBeInTheDocument()
  expect(close).toBeInTheDocument()
  expect(spy).not.toBeCalled()

  await fireEvent.click(close)

  expect(spy).toBeCalled()
})

it('should render title and text properly', () => {
  const screen = render({
    components: { Toast },
    template  : `
      <Toast text="Toast text" />
    `,
  })

  const toast = screen.queryByTestId('toast')
  const text  = screen.queryByTestId('toast-text')

  expect(toast).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('should be able to custom icon color via `iconColor` props', () => {
  const screen = render({
    components: {
      Toast,
      IconSuccess,
    },
    template: `
      <Toast
        :icon="icon"
        text="Toast text" iconColor="success" />
    `,
    setup () {
      return { icon: markRaw(IconSuccess) }
    },
  })

  const toast = screen.queryByTestId('toast')
  const text  = screen.queryByText('Toast text')
  const icon  = screen.queryByTestId('toast-icon')

  expect(toast).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(icon).toHaveClass('toast__icon--success')
})

it('should be able to custom icon using url', () => {
  const screen = render({
    components: { Toast },
    template  : `
      <Toast
        title="Popup title"
        icon="http://lorem-picsum.com" />
    `,
  })

  const popup = screen.queryByTestId('toast')
  const icon  = screen.queryByTestId('toast-icon-image')

  expect(popup).toBeInTheDocument()
  expect(icon).toBeInTheDocument()

  expect(icon).toBeInstanceOf(HTMLImageElement)
  expect(icon).toHaveAttribute('src', 'http://lorem-picsum.com')
})

it('should be able to show or hide close button via `dismissable` props', () => {
  const screen = render({
    components: { Toast },
    template  : `
      <Toast :dismissable="false" title="Toast title" variant="filled" />
    `,
  })

  const close = screen.queryByTestId('toast-close')

  expect(close).not.toBeInTheDocument()
})

it('should be able to show or hide close button via `dismissable` props', () => {
  const screen = render({
    components: { Toast },
    template  : `
      <Toast
        :dismissable="false"
        title="Toast title"
        variant="filled" />
    `,
  })

  const close = screen.queryByTestId('toast-close')

  expect(close).not.toBeInTheDocument()
})

it('should be able to show progress loading using `loading` props', () => {
  const screen = render({
    components: { Toast },
    template  : `
      <Toast
        loading
        loading-text="99%" />
    `,
  })

  const loading     = screen.queryByTestId('toast-loading')
  const loadingText = screen.queryByTestId('toast-loading-text')

  expect(loading).toBeInTheDocument()
  expect(loadingText).toBeInTheDocument()
  expect(loadingText).toHaveTextContent('99%')
})

it('should able to add action button', async () => {
  const onClick = vi.fn()
  const screen  = render({
    components: { Toast },
    template  : `
      <Toast
        text="Lorem ipsum"
        :actions="actions" />
    `,
    setup () {
      return {
        actions: [
          {
            text   : 'View Doc',
            onClick: onClick,
          },
        ],
      }
    },
  })

  const action = screen.queryByText('View Doc')

  expect(action).toBeInTheDocument()

  await fireEvent.click(action)

  expect(onClick).toBeCalled()
})
