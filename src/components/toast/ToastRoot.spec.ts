import { render, fireEvent } from '@testing-library/vue'
import ToastRoot from './ToastRoot.vue'
import { nextTick } from 'vue-demi'

it('should have class', async () => {
  const screen = render({
    components: { ToastRoot },
    template  : `
        <div>
          <ToastRoot ref="toast" />
          <button @click="addToast">Show</button>
        </div>
      `,
    methods: {
      async addToast () {
        await this.$refs.toast.add({ position: '' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const toast = screen.queryByTestId('toast-container')

  expect(toast).toHaveClass('toast-container--bottom-left')
})

// position top left
it('should have class', async () => {
  const screen = render({
    components: { ToastRoot },
    template  : `
        <div>
          <ToastRoot ref="toast" />
          <button @click="addToast">Show</button>
        </div>
      `,
    methods: {
      async addToast () {
        await this.$refs.toast.add({ position: 'top-left' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const toast = screen.queryByTestId('toast-container')

  expect(toast).toHaveClass('toast-container--top-left')
})

// position top center
it('should have class', async () => {
  const screen = render({
    components: { ToastRoot },
    template  : `
        <div>
          <ToastRoot ref="toast" />
          <button @click="addToast">Show</button>
        </div>
      `,
    methods: {
      async addToast () {
        await this.$refs.toast.add({ position: 'top-center' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const toast = screen.queryByTestId('toast-container')

  expect(toast).toHaveClass('toast-container--top-center')
})

// position top right
it('should have class', async () => {
  const screen = render({
    components: { ToastRoot },
    template  : `
        <div>
          <ToastRoot ref="toast" />
          <button @click="addToast">Show</button>
        </div>
      `,
    methods: {
      async addToast () {
        await this.$refs.toast.add({ position: 'top-right' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const toast = screen.queryByTestId('toast-container')

  expect(toast).toHaveClass('toast-container--top-right')
})

// position bottom left
it('should have class', async () => {
  const screen = render({
    components: { ToastRoot },
    template  : `
        <div>
          <ToastRoot ref="toast" />
          <button @click="addToast">Show</button>
        </div>
      `,
    methods: {
      async addToast () {
        await this.$refs.toast.add({ position: 'bottom-left' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const toast = screen.queryByTestId('toast-container')

  expect(toast).toHaveClass('toast-container--bottom-left')
})

// position bottom center
it('should have class', async () => {
  const screen = render({
    components: { ToastRoot },
    template  : `
        <div>
          <ToastRoot ref="toast" />
          <button @click="addToast">Show</button>
        </div>
      `,
    methods: {
      async addToast () {
        await this.$refs.toast.add({ position: 'bottom-center' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const toast = screen.queryByTestId('toast-container')

  expect(toast).toHaveClass('toast-container--bottom-center')
})

// position bottom right
it('should have class', async () => {
  const screen = render({
    components: { ToastRoot },
    template  : `
        <div>
          <ToastRoot ref="toast" />
          <button @click="addToast">Show</button>
        </div>
      `,
    methods: {
      async addToast () {
        await this.$refs.toast.add({ position: 'bottom-right' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const toast = screen.queryByTestId('toast-container')

  expect(toast).toHaveClass('toast-container--bottom-right')
})
