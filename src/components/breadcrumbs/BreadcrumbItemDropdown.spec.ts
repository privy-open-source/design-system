import { render } from '@testing-library/vue'
import BreadcrumbItemDropdown from './BreadcrumbItemDropdown.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { BreadcrumbItemDropdown },
    template  : `
      <BreadcrumbItemDropdown />
    `,
  })

  const breadcrumbDropdown = screen.queryByTestId('breadcrumbs-dropdown')
  const breadcrumbIcon     = screen.queryByTestId('breadcrumbs-icon')

  expect(breadcrumbDropdown).toBeInTheDocument()
  expect(breadcrumbDropdown).toHaveClass('breadcrumbs__item--dropdown')
  expect(breadcrumbIcon).toBeInTheDocument()
})

it('should be able to set active via prop `active`', () => {
  const screen = render({
    components: { BreadcrumbItemDropdown },
    template  : `
      <BreadcrumbItemDropdown active />
    `,
  })

  const breadcrumbDropdown = screen.queryByTestId('breadcrumbs-dropdown')

  expect(breadcrumbDropdown).toBeInTheDocument()
  expect(breadcrumbDropdown).toHaveClass('breadcrumbs__item--active')
})

it('should be able to set dropdown activator via prop `text`', () => {
  const screen = render({
    components: { BreadcrumbItemDropdown },
    template  : `
      <BreadcrumbItemDropdown text="Document" />
    `,
  })

  const breadcrumbDropdown = screen.queryByTestId('breadcrumbs-dropdown')

  expect(breadcrumbDropdown).toHaveTextContent('Document')
})
