import { render } from '@testing-library/vue'
import pListGroupItem from './ListGroupItem.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { pListGroupItem },
    template  : '<p-list-group-item />',
  })

  const listGroup = screen.getByTestId('list-group-item')

  expect(listGroup).toBeInTheDocument()
  expect(listGroup).toHaveClass('list-group__item')
})

it('should be able to set active state via `active` props', () => {
  const screen = render({
    components: { pListGroupItem },
    template  : '<p-list-group-item active />',
  })

  const listGroup = screen.getByTestId('list-group-item')

  expect(listGroup).toBeInTheDocument()
  expect(listGroup).toHaveClass('list-group__item', 'list-group__item--active')
})

it('should be able to set disable state via `disabled` props', () => {
  const screen = render({
    components: { pListGroupItem },
    template  : '<p-list-group-item disabled />',
  })

  const listGroup = screen.getByTestId('list-group-item')

  expect(listGroup).toBeInTheDocument()
  expect(listGroup).toHaveClass('list-group__item', 'list-group__item--disabled')
})

it('should be able to change element of list group via `element` props', () => {
  const screen = render({
    components: { pListGroupItem },
    template  : '<p-list-group-item element="div" />',
  })

  const listGroup = screen.getByTestId('list-group-item')

  expect(listGroup).toBeInTheDocument()
  expect(listGroup).toHaveClass('list-group__item')
  expect(listGroup).toContainHTML('div')
})

it('should be able to change element of list group with permalink via `element` props with `link` value', () => {
  const screen = render({
    components: { pListGroupItem },
    template  : '<p-list-group-item element="link" />',
  })

  const listGroup = screen.getByTestId('list-group-item')

  expect(listGroup).toBeInTheDocument()
  expect(listGroup).toHaveClass('list-group__item')
  expect(listGroup).toContainHTML('a')
})
