import { render } from '@testing-library/vue'
import SidebarMenu from './SidebarMenu.vue'
import { defineMenu } from '.'
import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
import IconDocument from '@carbon/icons-vue/lib/document/20'
import IconUsers from '@carbon/icons-vue/lib/group/20'
import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'

const menus = defineMenu([
  {
    items: [
      {
        name : 'dashboard',
        label: 'Dashboard',
        url  : '/',
        icon : IconDashboard,
      },
      {
        name       : 'document',
        label      : 'Documents',
        url        : '/',
        icon       : IconDocument,
        collapsible: true,
        submenu    : [
          {
            name : 'need-action',
            label: 'Need Action',
            url  : '/',
          },
          {
            name : 'in-progress',
            label: 'In Progress',
            url  : '/',
          },
          {
            name : 'others',
            label: 'Others',
            url  : '/',
          },
        ],
      },
      {
        name : 'contact',
        label: 'Contacts',
        url  : '/',
        icon : IconUsers,
      },
    ],
  },
  {
    condensed: true,
    title    : 'Quick Jump',
    items    : [
      {
        name : 'rejects',
        label: 'Rejects',
        url  : '/',
      },
      {
        name : 'archives',
        label: 'Archives',
        url  : '/',
      },
    ],
  },
  {
    bottom: true,
    items : [
      {
        name : 'settings',
        label: 'Settings',
        icon : IconSettings,
        url  : '/',
      },
      {
        name : 'english',
        label: 'English',
        url  : '/',
        icon : './assets/images/img-flag.svg',
      },
    ],
  },
])

it('should rendered properly without any props', () => {
  const screen = render({
    components: { SidebarMenu },
    template  : `
      <SidebarMenu />
    `,
  })

  const sidebar = screen.queryByTestId('sidebar-menu')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar')
})

it('should be able to render menus', () => {
  const screen = render({
    components: { SidebarMenu },
    template  : '<SidebarMenu fixed :menus="menus" />',
    setup () {
      return { menus }
    },
  })

  const sidebar = screen.getByTestId('sidebar-menu')
  const names   = screen.getAllByText('Dashboard')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--wide')
  expect(names).toHaveLength(1)
})

it('should be able to change type via prop `type`', () => {
  const screen = render({
    components: { SidebarMenu },
    template  : `
      <SidebarMenu type="narrow">
      </SidebarMenu>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar-menu')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--narrow', 'sidebar--pills')
})

it('should be able to set alignment via prop `align`', () => {
  const screen = render({
    components: { SidebarMenu },
    template  : `
      <SidebarMenu align="right">
      </SidebarMenu>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar-menu')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--right')
})

it('should be able to make sidebar fixed via prop `fixed`', () => {
  const screen = render({
    components: { SidebarMenu },
    template  : `
      <SidebarMenu fixed>
      </SidebarMenu>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar-menu')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--fixed')
})

it('should be able to make sidebar expand automatically via prop `toggleable`', () => {
  const screen = render({
    components: { SidebarMenu },
    template  : `
      <SidebarMenu toggleable="md">
      </SidebarMenu>
    `,
  })

  const sidebar = screen.queryByTestId('sidebar-menu')

  expect(sidebar).toBeInTheDocument()
  expect(sidebar).toHaveClass('sidebar--toggleable', 'sidebar--toggleable-md')
})
