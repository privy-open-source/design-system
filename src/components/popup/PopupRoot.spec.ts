import { render, fireEvent } from '@testing-library/vue'
import PopupRoot from './PopupRoot.vue'
import { nextTick } from 'vue-demi'

it('should have class', async () => {
  const screen = render({
    components: { PopupRoot },
    template  : `
        <div>
          <PopupRoot ref="popup" />
          <button @click="addPopup">Show</button>
        </div>
      `,
    methods: {
      async addPopup () {
        await this.$refs.popup.add({ position: '' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const popup = screen.queryByTestId('popup-container')

  expect(popup).toHaveClass('popup-container--bottom-left')
})

// position top left
it('should have class', async () => {
  const screen = render({
    components: { PopupRoot },
    template  : `
        <div>
          <PopupRoot ref="popup" />
          <button @click="addPopup">Show</button>
        </div>
      `,
    methods: {
      async addPopup () {
        await this.$refs.popup.add({ position: 'top-left' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const popup = screen.queryByTestId('popup-container')

  expect(popup).toHaveClass('popup-container--top-left')
})

// position top center
it('should have class', async () => {
  const screen = render({
    components: { PopupRoot },
    template  : `
        <div>
          <PopupRoot ref="popup" />
          <button @click="addPopup">Show</button>
        </div>
      `,
    methods: {
      async addPopup () {
        await this.$refs.popup.add({ position: 'top-center' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const popup = screen.queryByTestId('popup-container')

  expect(popup).toHaveClass('popup-container--top-center')
})

// position top right
it('should have class', async () => {
  const screen = render({
    components: { PopupRoot },
    template  : `
        <div>
          <PopupRoot ref="popup" />
          <button @click="addPopup">Show</button>
        </div>
      `,
    methods: {
      async addPopup () {
        await this.$refs.popup.add({ position: 'top-right' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const popup = screen.queryByTestId('popup-container')

  expect(popup).toHaveClass('popup-container--top-right')
})

// position bottom left
it('should have class', async () => {
  const screen = render({
    components: { PopupRoot },
    template  : `
        <div>
          <PopupRoot ref="popup" />
          <button @click="addPopup">Show</button>
        </div>
      `,
    methods: {
      async addPopup () {
        await this.$refs.popup.add({ position: 'bottom-left' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const popup = screen.queryByTestId('popup-container')

  expect(popup).toHaveClass('popup-container--bottom-left')
})

// position bottom center
it('should have class', async () => {
  const screen = render({
    components: { PopupRoot },
    template  : `
        <div>
          <PopupRoot ref="popup" />
          <button @click="addPopup">Show</button>
        </div>
      `,
    methods: {
      async addPopup () {
        await this.$refs.popup.add({ position: 'bottom-center' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const popup = screen.queryByTestId('popup-container')

  expect(popup).toHaveClass('popup-container--bottom-center')
})

// position bottom right
it('should have class', async () => {
  const screen = render({
    components: { PopupRoot },
    template  : `
        <div>
          <PopupRoot ref="popup" />
          <button @click="addPopup">Show</button>
        </div>
      `,
    methods: {
      async addPopup () {
        await this.$refs.popup.add({ position: 'bottom-right' })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await nextTick()

  const popup = screen.queryByTestId('popup-container')

  expect(popup).toHaveClass('popup-container--bottom-right')
})
