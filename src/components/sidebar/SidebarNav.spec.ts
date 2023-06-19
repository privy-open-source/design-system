import { render, fireEvent } from '@testing-library/vue'
import { delay } from 'nanodelay'
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
  const sidebarTitle = screen.queryByTestId('sidebar-nav-action')

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarTitle).toBeInTheDocument()
  expect(sidebarTitle).toHaveTextContent('Show more')
  expect(sidebarTitle).toHaveAttribute('href', '/document/category')
})

it('should be able to set collapsible grouped menu via props `collapsible`', async () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar>
        <SidebarNav title="Title" collapsible />
      </Sidebar>
    `,
  })

  const sidebarNav   = screen.queryByTestId('sidebar-nav')
  const sidebarTitle = screen.queryByTestId('sidebar-title')
  const caret        = screen.queryByTestId('sidebar-title-caret')

  expect(sidebarTitle).toBeInTheDocument()
  expect(sidebarTitle).toHaveClass('sidebar__title__collapsible')
  expect(sidebarTitle).not.toHaveClass('sidebar__title--collapsed')
  expect(caret).toBeInTheDocument()
  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarNav).not.toHaveClass('sidebar__nav--collapsed')

  await fireEvent.click(sidebarTitle)
  await delay(0)

  expect(sidebarTitle).toHaveClass('sidebar__title--collapsed')
  expect(sidebarNav).toHaveClass('sidebar__nav--collapsed')
})
