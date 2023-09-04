import { render } from '@testing-library/vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { BreadcrumbItem },
    template  : `
      <BreadcrumbItem />
    `,
  })

  const breadcrumbItem    = screen.getByTestId('breadcrumbs-item')
  const breadcrumbDivider = screen.queryByTestId('breadcrumbs-divider')

  expect(breadcrumbItem).toBeInTheDocument()
  expect(breadcrumbItem).toHaveClass('breadcrumbs__item')
  expect(breadcrumbDivider).toBeInTheDocument()
})

it('should be able to set active via prop `active`', () => {
  const screen = render({
    components: { BreadcrumbItem },
    template  : `
      <BreadcrumbItem active />
    `,
  })

  const breadcrumbItem  = screen.getByTestId('breadcrumbs-item')
  const dropdownDivider = screen.queryByTestId('dropdown-divider')

  expect(breadcrumbItem).toHaveClass('breadcrumbs__item--active')
  expect(breadcrumbItem).toContainHTML('<span class="" />')
  expect(breadcrumbItem).not.toContainHTML('<a />')
  expect(dropdownDivider).not.toBeInTheDocument()
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
