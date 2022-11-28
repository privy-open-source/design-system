import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import TourDialog from './TourDialog.vue'

it('should render properly', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog />',
  })

  const tour = screen.queryByTestId('tour-dialog')

  expect(tour).toBeInTheDocument()
})

it('should able to set title using prop `title`', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog title="Hello World" />',
  })

  const title = screen.queryByTestId('tour-title')

  expect(title).toBeInTheDocument()
  expect(title).toHaveTextContent('Hello World')
})

it('should able to set text using prop `text`', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog text="Hello World" />',
  })

  const text = screen.queryByTestId('tour-text')

  expect(text).toBeInTheDocument()
  expect(text).toHaveTextContent('Hello World')
})

it('should show an image if prop `image` was provided', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog image="http://image.com/50x50" />',
  })

  const image = screen.queryByTestId('tour-image')

  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('src', 'http://image.com/50x50')
})

it('should hide title if prop `title` not provided', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog />',
  })

  const title = screen.queryByTestId('tour-title')

  expect(title).not.toBeInTheDocument()
})

it('should hide image if prop `image` not provided', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog />',
  })

  const image = screen.queryByTestId('tour-image')

  expect(image).not.toBeInTheDocument()
})

it('should meta total steps if prop `totalPage` less than 2', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog :step="1" :totalStep="2" />',
  })

  const meta = screen.queryByTestId('tour-meta')

  expect(meta).not.toBeInTheDocument()
})

it('should meta total steps if prop `totalPage` more than 2', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog :step="1" :totalStep="5" />',
  })

  const meta = screen.queryByTestId('tour-meta')

  expect(meta).toBeInTheDocument()
  expect(meta).toHaveTextContent('1 / 5')
})

it('should disabled prev button if on page 1', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog :step="1" :totalStep="5" />',
  })

  const prev = screen.queryByTestId('tour-control-prev')

  expect(prev).toBeInTheDocument()
  expect(prev).toBeDisabled()
})

it('should enable prev button if on page greater than 1', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog :step="2" :totalStep="5" />',
  })

  const prev = screen.queryByTestId('tour-control-prev')

  expect(prev).toBeInTheDocument()
  expect(prev).not.toBeDisabled()
})

it('should show dismiss button if not last step', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog :step="1" :totalStep="5" />',
  })

  const dismiss = screen.queryByTestId('tour-control-dismiss')

  expect(dismiss).toBeInTheDocument()
})

it('should show finish button on last step', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog :step="5" :totalStep="5" />',
  })

  const next    = screen.queryByTestId('tour-control-next')
  const dismiss = screen.queryByTestId('tour-control-finish')

  expect(next).not.toBeInTheDocument()
  expect(dismiss).toBeInTheDocument()
})

it('should hide finish button when not the last step', () => {
  const screen = render({
    components: { TourDialog },
    template  : '<tour-dialog :step="1" :totalStep="5" />',
  })

  const next    = screen.queryByTestId('tour-control-next')
  const dismiss = screen.queryByTestId('tour-control-finish')

  expect(next).toBeInTheDocument()
  expect(dismiss).not.toBeInTheDocument()
})

it('should hide dismis button if prop `dismissable` set to false', () => {
  const screen = render({
    components: { TourDialog },
    template  : `
      <tour-dialog
        :step="3"
        :totalStep="5"
        :dismissable="false" />
      `,
  })

  const dismiss     = screen.queryByTestId('tour-dismiss')
  const dismissCtrl = screen.queryByTestId('tour-control-dismiss')

  expect(dismiss).not.toBeInTheDocument()
  expect(dismissCtrl).not.toBeInTheDocument()
})

it('should emit `next` if next button clicked', async () => {
  const onNext = vi.fn()
  const screen = render({
    components: { TourDialog },
    template  : `
      <tour-dialog
        :step="3"
        :totalStep="5"
        @next="onNext" />
      `,
    setup () {
      return { onNext }
    },
  })

  const next = screen.queryByTestId('tour-control-next')

  await fireEvent.click(next)

  expect(onNext).toBeCalled()
})

it('should emit `next` if finish button clicked', async () => {
  const onNext = vi.fn()
  const screen = render({
    components: { TourDialog },
    template  : `
      <tour-dialog
        :step="5"
        :totalStep="5"
        @next="onNext" />
      `,
    setup () {
      return { onNext }
    },
  })

  const finish = screen.queryByTestId('tour-control-finish')

  await fireEvent.click(finish)

  expect(onNext).toBeCalled()
})

it('should emit `prev` if prev button clicked', async () => {
  const onPrev = vi.fn()
  const screen = render({
    components: { TourDialog },
    template  : `
      <tour-dialog
        :step="3"
        :totalStep="5"
        @prev="onPrev" />
      `,
    setup () {
      return { onPrev }
    },
  })

  const prev = screen.queryByTestId('tour-control-prev')

  await fireEvent.click(prev)

  expect(onPrev).toBeCalled()
})

it('should emit `dismiss` if dismiss button clicked', async () => {
  const onDismiss = vi.fn()
  const screen    = render({
    components: { TourDialog },
    template  : `
      <tour-dialog
        :step="3"
        :totalStep="5"
        @dismiss="onDismiss" />
      `,
    setup () {
      return { onDismiss }
    },
  })

  const dismiss     = screen.queryByTestId('tour-dismiss')
  const dismissCtrl = screen.queryByTestId('tour-control-dismiss')

  await fireEvent.click(dismiss)
  await fireEvent.click(dismissCtrl)

  expect(onDismiss).toBeCalledTimes(2)
})
