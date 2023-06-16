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

it('should be able to add title of grouping navigation via prop `title`', () => {
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

it('should be able to place group of navigation in the bottom via prop `bottom`', () => {
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

it('should be able to make condensed navigation via prop `condensed`', () => {
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

it('should be able to set sidebar section-title via props `title-action-label` and `title-action-url`', () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar>
        <SidebarNav title="Title" title-action-label="Show more" title-action-url="/document/category" />
      </Sidebar>
    `,
  })

  const sidebarNav   = screen.queryByTestId('sidebar-nav')
  const sidebarTitle = screen.queryByTestId('nav-action')

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarTitle).toBeInTheDocument()
  expect(sidebarTitle).toHaveTextContent('Show more')
  expect(sidebarTitle).toHaveAttribute('href', '/document/category')
})
