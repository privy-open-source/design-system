import { render } from '@testing-library/vue'
import Sidebar from './Sidebar.vue'
import SidebarBrand from './SidebarBrand.vue'
import SidebarNav from './SidebarNav.vue'
import { ref, nextTick } from 'vue-demi'

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

it('should be able to change variant via prop `variant`', () => {
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

  const sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--fixed')
})

it('should be able to make sidebar sticky via prop `sticky`', () => {
  const screen = render({
    components: { Sidebar },
    template  : `
      <Sidebar sticky />
    `,
  })

  const sidebar = screen.queryByTestId('sidebar')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--sticky')
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

  expect(sidebarNav).toBeInTheDocument()
  expect(sidebarBottom).toBeInTheDocument()
  expect(sidebarNav).toHaveTextContent('Text')
})
