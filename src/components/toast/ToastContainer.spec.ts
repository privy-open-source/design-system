import { render, fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import { nextTick } from 'vue-demi'
import ToastContainer from './ToastContainer.vue'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should be able to show all toast', async () => {
  const screen = render({
    components: { ToastContainer },
    template  : `
      <div>
        <ToastContainer ref="toast" />
        <button @click="addToast">Show</button>
      </div>
    `,
    methods: {
      addToast () {
        this.$refs.toast.add({
          title: 'This is title',
          text : 'This is text message',
        })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await fireEvent.click(button)

  const toasts = screen.queryAllByTestId('toast')

  expect(toasts).toHaveLength(2)
})

it('should removed automatically when duration timeout', async () => {
  const screen = render({
    components: { ToastContainer },
    template  : `
      <div>
        <ToastContainer ref="toast" />
        <button @click="addToast">Show</button>
      </div>
    `,
    methods: {
      addToast () {
        this.$refs.toast.add({
          title   : 'This is title',
          text    : 'This is text message',
          duration: 10,
        })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)

  const toast = screen.queryByTestId('toast')

  expect(toast).toBeInTheDocument()

  vi.advanceTimersByTime(11)
  await nextTick()

  expect(toast).not.toBeInTheDocument()
})

it('should removed when close clockid', async () => {
  const screen = render({
    components: { ToastContainer },
    template  : `
      <div>
        <ToastContainer ref="toast" />
        <button @click="addToast">Show</button>
      </div>
    `,
    methods: {
      addToast () {
        this.$refs.toast.add({
          title: 'This is title',
          text : 'This is text message',
        })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)

  const toast = screen.queryByTestId('toast')
  const close = screen.queryByTestId('toast-close')

  expect(toast).toBeInTheDocument()

  await fireEvent.click(close)

  expect(toast).not.toBeInTheDocument()
})

it('should be able to have class', async () => {
  const screen = render({
    components: { ToastContainer },
    template  : `
          <div>
            <ToastContainer ref="toast" />
            <button @click="addToast">Show</button>
            <button @click="addToast2">Show-2</button>
          </div>
      `,
    methods: {
      addToast () {
        this.$refs.toast.add({
          title   : 'This is title',
          text    : 'This is text message',
          position: 'bottom-left',
        })
      },
      addToast2 () {
        this.$refs.toast.add({
          title   : 'This is title 2',
          text    : 'This is text message 2',
          position: 'bottom-left',
        })
      },
    },
  })

  const button  = screen.queryByText('Show')
  const button2 = screen.queryByText('Show-2')

  await fireEvent.click(button)
  await fireEvent.click(button2)
  await nextTick()

  const toast = screen.queryAllByTestId('toast')

  expect(toast.at(1)).toHaveTextContent('This is text message')
})
