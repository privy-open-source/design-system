import { render } from '@testing-library/vue'
import TourCard from './TourCard.vue'

it('should render properly', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card />',
  })

  const tour = screen.queryByTestId('tour-card')

  expect(tour).toBeInTheDocument()
})

it('should able to set title using prop `title`', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card title="Hello World" />',
  })

  const title = screen.queryByTestId('tour-title')

  expect(title).toBeInTheDocument()
  expect(title).toHaveTextContent('Hello World')
})

it('should able to set text using prop `text`', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card text="Hello World" />',
  })

  const text = screen.queryByTestId('tour-text')

  expect(text).toBeInTheDocument()
  expect(text).toHaveTextContent('Hello World')
})

it('should show an image if prop `image` was provided', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card image="http://image.com/50x50" />',
  })

  const image = screen.queryByTestId('tour-image')

  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('src', 'http://image.com/50x50')
})

it('should hide title if prop `title` not provided', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card />',
  })

  const title = screen.queryByTestId('tour-title')

  expect(title).not.toBeInTheDocument()
})

it('should hide image if prop `image` not provided', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card />',
  })

  const image = screen.queryByTestId('tour-image')

  expect(image).not.toBeInTheDocument()
})

it('should meta total steps if prop `totalPage` less than 2', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card :step="1" :totalStep="2" />',
  })

  const meta = screen.queryByTestId('tour-meta')

  expect(meta).not.toBeInTheDocument()
})

it('should meta total steps if prop `totalPage` more than 2', () => {
  const screen = render({
    components: { TourCard },
    template  : '<tour-card :step="1" :totalStep="5" />',
  })

  const meta = screen.queryByTestId('tour-meta')

  expect(meta).toBeInTheDocument()
  expect(meta).toHaveTextContent('1 / 5')
})
