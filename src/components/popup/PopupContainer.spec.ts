import { render, fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import { nextTick } from 'vue-demi'
import PopupContainer from './PopupContainer.vue'
import Icon from '@privyid/persona-icon/vue/checkmark-circle-solid/20.vue'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should be able to show all popup', async () => {
  const screen = render({
    components: { PopupContainer, Icon },
    template  : `
      <div>
        <PopupContainer ref="popup" />
        <button @click="addPopup">Show</button>
      </div>
    `,
    methods: {
      addPopup () {
        this.$refs.popup.add({
          title: 'This is title',
          text : 'This is text message',
          icon : Icon,
        })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)
  await fireEvent.click(button)

  const popups = screen.queryAllByTestId('popup')

  expect(popups).toHaveLength(2)
})

it('should removed automatically when duration timeout', async () => {
  const screen = render({
    components: { PopupContainer },
    template  : `
      <div>
        <PopupContainer ref="popup" />
        <button @click="addPopup">Show</button>
      </div>
    `,
    methods: {
      addPopup () {
        this.$refs.popup.add({
          title   : 'This is title',
          text    : 'This is text message',
          duration: 10,
        })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)

  const popup = screen.queryByTestId('popup')

  expect(popup).toBeInTheDocument()

  vi.advanceTimersByTime(11)
  await nextTick()

  expect(popup).not.toBeInTheDocument()
})

it('should removed when close clockid', async () => {
  const screen = render({
    components: { PopupContainer },
    template  : `
      <div>
        <PopupContainer ref="popup" />
        <button @click="addPopup">Show</button>
      </div>
    `,
    methods: {
      addPopup () {
        this.$refs.popup.add({
          title: 'This is title',
          text : 'This is text message',
          icon : './assets/images/img-flag.svg',
        })
      },
    },
  })

  const button = screen.queryByText('Show')

  await fireEvent.click(button)

  const popup = screen.queryByTestId('popup')
  const close = screen.queryByTestId('popup-close')

  expect(popup).toBeInTheDocument()

  await fireEvent.click(close)

  expect(popup).not.toBeInTheDocument()
})

it('should be able to have class', async () => {
  const screen = render({
    components: { PopupContainer },
    template  : `
          <div>
            <PopupContainer ref="toast" />
            <button @click="addPopup">Show</button>
            <button @click="addPopup2">Show-2</button>
          </div>
      `,
    methods: {
      addPopup () {
        this.$refs.toast.add({
          title   : 'This is title',
          text    : 'This is text message',
          position: 'bottom-left',
        })
      },
      addPopup2 () {
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

  const popup = screen.queryAllByTestId('popup')

  expect(popup.at(1)).toHaveTextContent('This is text message')
})
