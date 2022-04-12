
import { render, fireEvent } from "@testing-library/vue"
import { vi } from "vitest"
import { nextTick } from "vue-demi"
import ToastContainer from "./ToastContainer.vue"

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
          text : 'This is text message'
        })
      }
    }
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
      }
    }
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
          title   : 'This is title',
          text    : 'This is text message',
          duration: 10,
        })
      }
    }
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)

  const toast = screen.queryByTestId('toast')
  const close = screen.queryByTestId('toast-close')

  expect(toast).toBeInTheDocument()

  await fireEvent.click(close)

  expect(toast).not.toBeInTheDocument()
})
