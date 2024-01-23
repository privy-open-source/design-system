import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { markRaw } from 'vue-demi'
import Popup from './Popup.vue'
import IconFailed from '@privyid/persona-icon/vue/trash/24.vue'
import { SVGElement } from 'happy-dom'

it('should render title and text properly', () => {
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        title="This is title"
        text="this is text body" />
    `,
  })

  const popup = screen.queryByTestId('popup')
  const title = screen.queryByText('This is title')
  const text  = screen.queryByText('this is text body')

  expect(popup).toBeInTheDocument()
  expect(popup).toHaveClass('popup', 'popup--info', 'popup--simple')
  expect(title).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('should have class "success" if type prop set to "success"', () => {
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        type="success"
        title="This is title"
        text="this is text body" />
    `,
  })

  const popup = screen.queryByTestId('popup')

  expect(popup).toBeInTheDocument()
  expect(popup).toHaveClass('popup', 'popup--success', 'popup--simple')
  expect(popup).not.toHaveClass('popup--info')
})

it('should have class "filled" if variant prop set to "filled"', () => {
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        variant="filled"
        title="This is title"
        text="this is text body" />
    `,
  })

  const popup = screen.queryByTestId('popup')

  expect(popup).toBeInTheDocument()
  expect(popup).toHaveClass('popup', 'popup--info', 'popup--filled')
  expect(popup).not.toHaveClass('popup--simple')
})

it('should dismiss if close button clicked', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        title="This is title"
        text="this is text body"
        @dismissed="onDismissed" />
    `,
    methods: { onDismissed: spy },
  })

  const popup = screen.queryByTestId('popup')
  const close = screen.queryByTestId('popup-close')

  expect(popup).toBeInTheDocument()
  expect(close).toBeInTheDocument()
  expect(spy).not.toBeCalled()

  await fireEvent.click(close)

  expect(spy).toBeCalled()
})

it('should render title and text properly', () => {
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        title="Popup title" />
    `,
  })

  const popup = screen.queryByTestId('popup')
  const title = screen.queryByText('Popup title')
  const text  = screen.queryByTestId('popup-text')

  expect(popup).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(text).not.toBeInTheDocument()
})

it('should be able to custom icon color via `iconColor` props', () => {
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        title="Popup title"
        icon-color="warning" />
    `,
  })

  const popup = screen.queryByTestId('popup')
  const title = screen.queryByText('Popup title')
  const icon  = screen.queryByTestId('popup-icon')

  expect(popup).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(icon).toHaveClass('popup__icon--warning')
})

it('should be able to custom icon using url', () => {
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        title="Popup title"
        icon="http://lorem-picsum.com" />
    `,
  })

  const popup = screen.queryByTestId('popup')
  const icon  = screen.queryByTestId('popup-icon-image')

  expect(popup).toBeInTheDocument()
  expect(icon).toBeInTheDocument()

  expect(icon).toBeInstanceOf(HTMLImageElement)
  expect(icon).toHaveAttribute('src', 'http://lorem-picsum.com')
})

it('should be able to custom icon using component', () => {
  const screen = render({
    components: { Popup },
    template  : `
      <Popup
        title="Popup title"
        :icon="icon" />
    `,
    setup () {
      return { icon: markRaw(IconFailed) }
    },
  })

  const popup = screen.queryByTestId('popup')
  const icon  = screen.queryByTestId('popup-icon').firstChild

  expect(popup).toBeInTheDocument()
  expect(icon).toBeInTheDocument()

  expect(icon).toBeInstanceOf(SVGElement)
  expect(icon).toHaveClass('persona-icon')
})

it('should able to add action button', async () => {
  const onClick = vi.fn()
  const screen  = render({
    components: { Popup },
    template  : `
      <Popup
        title="Popup title"
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
