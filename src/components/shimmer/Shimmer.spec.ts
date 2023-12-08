import { render } from '@testing-library/vue'
import Shimmer from './Shimmer.vue'

it('should render properly without any prop', () => {
  const screen = render({
    components: { Shimmer },
    template  : `
      <Shimmer />
    `,
  })

  const shimmer = screen.getByTestId('shimmer')

  expect(shimmer).toBeInTheDocument()
  expect(shimmer).toHaveClass('shimmer')
})

it('should able to change width and height with props `width` and `height`', () => {
  const screen = render({
    components: { Shimmer },
    template  : `
      <Shimmer width="400" height="300" />
    `,
  })

  const shimmer = screen.getByTestId('shimmer')

  expect(shimmer).toBeInTheDocument()
  expect(shimmer).toHaveAttribute('width', '400')
  expect(shimmer).toHaveAttribute('height', '300')
  expect(shimmer).toHaveAttribute('viewBox', '0 0 400 300')
})

it('should enable responsive mode when props `responsive` was provided', () => {
  const screen = render({
    components: { Shimmer },
    template  : `
      <Shimmer responsive />
    `,
  })

  const shimmer = screen.getByTestId('shimmer')

  expect(shimmer).toBeInTheDocument()
  expect(shimmer).toHaveClass('shimmer--responsive')
})
