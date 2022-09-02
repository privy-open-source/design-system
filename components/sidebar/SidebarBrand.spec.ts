import { render } from '@testing-library/vue'
import Sidebar from './Sidebar.vue'
import SidebarBrand from './SidebarBrand.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Sidebar, SidebarBrand },
    template  : `
      <Sidebar>
        <SidebarBrand>Brand</SidebarBrand>
      </Sidebar>
    `,
  })

  const sidebarBrand = screen.queryByTestId('sidebar-brand')
  const text         = screen.queryByText('Brand')

  expect(sidebarBrand).toBeInTheDocument()
  expect(sidebarBrand).toHaveClass('sidebar__brand')
  expect(text).toBeInTheDocument()
})

it('should have add target url by setting the `href` prop', () => {
  const screen = render({
    components: { Sidebar, SidebarBrand },
    template  : `
      <Sidebar>
        <SidebarBrand href="https://privy.id">Brand</SidebarBrand>
      </Sidebar>
    `,
  })

  const sidebarBrand = screen.queryByTestId('sidebar-brand')

  expect(sidebarBrand).toBeInTheDocument()
  expect(sidebarBrand).toHaveAttribute('href', 'https://privy.id')
})
