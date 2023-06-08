import { render } from '@testing-library/vue'
import Sidebar from './Sidebar.vue'
import SidebarBrand from './SidebarBrand.vue'
import SidebarNav from './SidebarNav.vue'
import { ref, nextTick } from 'vue-demi'
import { delay } from 'nanodelay'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Sidebar },
    template  : `
      <Sidebar>
      </Sidebar>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar')
})

it('should be abble to change variant via prop `variant`', () => {
  const screen = render({
    components: { Sidebar },
    template  : `
      <Sidebar variant="lines">
      </Sidebar>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--lines')
  expect(sidebar).not.toHaveClass('sidebar--pills')
})

it('should be able to change type via prop `type`', () => {
  const screen = render({
    components: { Sidebar },
    template  : `
      <Sidebar type="narrow">
      </Sidebar>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--narrow', 'sidebar--pills')
})

it('should be able to set alignment via prop `align`', () => {
  const screen = render({
    components: { Sidebar },
    template  : `
      <Sidebar align="right">
      </Sidebar>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--right')
})

it('should be able to make sidebar fixed via prop `fixed`', async () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar fixed>
        <SidebarNav />
      </Sidebar>
    `,
  })

  const sidebar   = screen.queryByTestId('sidebar')
  let sidebarMenu = screen.queryByTestId('sidebar-menus')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--fixed')

  await delay(1)
  sidebarMenu = screen.queryByTestId('sidebar-menus')
  expect(sidebarMenu).toHaveStyle('padding-bottom: 0px')
  expect(sidebarMenu).toHaveAttribute('data-bottom-menu', 'false')
})

it('should be able to make sidebar automatically expand via prop `toggleable`', () => {
  const screen = render({
    components: { Sidebar },
    template  : `
      <Sidebar toggleable="md">
      </Sidebar>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--toggleable', 'sidebar--toggleable-md')
})

it('sidebar able to toggle via v-model', async () => {
  const model  = ref(true)
  const screen = render({
    components: { Sidebar },
    template  : `
      <Sidebar
        v-model="model"
        fixed
        toggleable="md">
        Sidebar Text
      </Sidebar>
    `,
    setup () {
      return { model }
    },
  })

  let sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--show')

  model.value = false
  await nextTick()

  sidebar = screen.queryByTestId('sidebar')
  expect(sidebar).not.toHaveClass('sidebar--show')
})

it('able to add sidebar brand via `brand` slots', () => {
  const screen = render({
    components: { Sidebar, SidebarBrand },
    template  : `
      <Sidebar>
        <template #brand>
          <SidebarBrand>
            brand
          </SidebarBrand>
        </template>
      </Sidebar>
    `,
  })

  const sidebarMenu  = screen.queryByTestId('sidebar-menus')
  const sidebarBrand = screen.queryByTestId('sidebar-brand')

  expect(sidebarMenu).not.toContainElement(sidebarBrand)
  expect(sidebarBrand).toHaveTextContent('brand')
})

it('should have style that contain variables to calculate sidebar__menus', async () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar fixed>
        <SidebarNav bottom />
      </Sidebar>
    `,
  })

  let sidebarMenu = screen.queryByTestId('sidebar-menus')

  expect(sidebarMenu).toHaveAttribute('data-sidebar-menu', '0')

  await nextTick()
  sidebarMenu = screen.queryByTestId('sidebar-menus')
  expect(sidebarMenu).toHaveStyle('padding-bottom: 0px')
  expect(sidebarMenu).toHaveAttribute('data-bottom-menu', 'true')
})

it('should have style to set padding bottom of sidebar__menus when bottom menu available', async () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar fixed>
        <SidebarNav />
        <SidebarNav bottom />
      </Sidebar>
    `,
  })

  let sidebarMenu = screen.queryByTestId('sidebar-menus')

  await delay(1)
  expect(sidebarMenu).toHaveStyle('padding-bottom: 16px')
  sidebarMenu = screen.queryByTestId('sidebar-menus')
  expect(sidebarMenu).toHaveAttribute('data-bottom-menu', 'true')
})

it('able to add sidebar bottom via `bottom` slots', async () => {
  const screen = render({
    components: { Sidebar, SidebarNav },
    template  : `
      <Sidebar>
        <template #bottom>
          <SidebarNav>
            Text
          </SidebarNav>
        </template>
      </Sidebar>
    `,
  })

  const sidebarNav    = screen.queryByTestId('sidebar-nav')
  const sidebarBottom = screen.queryByTestId('sidebar-bottom')
  let sidebarMenu     = screen.queryByTestId('sidebar-menus')

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarBottom).toBeInTheDocument()
  expect(sidebarNav).toHaveTextContent('Text')

  await nextTick()
  sidebarMenu = screen.queryByTestId('sidebar-menus')
  expect(sidebarMenu).toHaveAttribute('data-bottom-menu', 'false')
})
