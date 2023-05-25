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
  const sidebarLink  = screen.queryByTestId('sidebar-brand-link')

  expect(sidebarBrand).toBeInTheDocument()
  expect(sidebarLink).toHaveAttribute('href', 'https://privy.id')
})

it('should have sticky position by setting the `sticky` prop', () => {
  const screen = render({
    components: { Sidebar, SidebarBrand },
    template  : `
      <Sidebar>
        <SidebarBrand sticky />
      </Sidebar>
    `,
  })

  const sidebarBrand = screen.queryByTestId('sidebar-brand')

  expect(sidebarBrand).toHaveClass('sidebar__brand--sticky')
})

it('should have fixed position by setting the `fixed` prop', () => {
  const screen = render({
    components: { Sidebar, SidebarBrand },
    template  : `
      <Sidebar>
        <SidebarBrand fixed />
      </Sidebar>
    `,
  })

  const sidebarBrand = screen.queryByTestId('sidebar-brand')

  expect(sidebarBrand).toHaveClass('sidebar__brand--fixed')
})
