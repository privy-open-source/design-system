import { render } from '@testing-library/vue'
import Sidebar from './Sidebar.vue'
import SidebarNav from './SidebarNav.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar>
        <SidebarNav></SidebarNav>
      </Sidebar>
    `,
  })

  const sidebarNav = screen.queryByTestId('sidebar-nav')

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarNav).toHaveClass('sidebar__nav', 'nav--vertical')
})

it('should be abble to add title of grouping navigation via prop `title`', () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar>
        <SidebarNav title="Menus"></SidebarNav>
      </Sidebar>
    `,
  })

  const sidebarNav = screen.queryByTestId('sidebar-nav')

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarNav).toHaveClass('nav--has-title')
})

it('should be abble to place group of navigation in the bottom via prop `bottom`', () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar>
        <SidebarNav title="Menus" bottom></SidebarNav>
      </Sidebar>
    `,
  })

  const sidebarNav = screen.queryByTestId('sidebar-nav')

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarNav).toHaveClass('sidebar__nav--bottom')
})

it('should be abble to make condensed navigation via prop `condensed`', () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar>
        <SidebarNav condensed></SidebarNav>
      </Sidebar>
    `,
  })

  const sidebarNav = screen.queryByTestId('sidebar-nav')

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarNav).toHaveClass('nav--condensed')
})
