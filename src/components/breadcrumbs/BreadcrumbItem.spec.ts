import { render } from '@testing-library/vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { BreadcrumbItem },
    template  : `
      <BreadcrumbItem />
    `,
  })

  const breadcrumbItem = screen.getByTestId('breadcrumbs-item')
  const breadcrumbIcon = screen.queryByTestId('breadcrumbs-icon')

  expect(breadcrumbItem).toBeInTheDocument()
  expect(breadcrumbItem).toHaveClass('breadcrumbs__item')
  expect(breadcrumbIcon).toBeInTheDocument()
})

it('should be able to set active via prop `active`', () => {
  const screen = render({
    components: { BreadcrumbItem },
    template  : `
      <BreadcrumbItem active />
    `,
  })

  const breadcrumbItem = screen.getByTestId('breadcrumbs-item')
  const dropdownIcon   = screen.queryByTestId('dropdown-icon')

  expect(breadcrumbItem).toHaveClass('breadcrumbs__item--active')
  expect(breadcrumbItem).toContainHTML('<span />')
  expect(breadcrumbItem).not.toContainHTML('<a />')
  expect(dropdownIcon).not.toBeInTheDocument()
})

it('should be able to set url permalink via prop `href`', () => {
  const screen = render({
    components: { BreadcrumbItem },
    template  : `
      <BreadcrumbItem href="/home">
        Home
      </BreadcrumbItem>
    `,
  })

  const breadcrumbItem = screen.getByTestId('breadcrumbs-item')
  const text           = screen.queryByText('Home')

  expect(breadcrumbItem).toContainHTML('a')
  expect(breadcrumbItem).not.toContainHTML('<span />')
  expect(text).toBeInTheDocument()
})
