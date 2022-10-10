import { render } from '@testing-library/vue'
import pNavbarMenu from './NavbarMenu.vue'
import { defineNavbarMenu, defineSetting } from './use-navbar-menu'
import IconBee from '@carbon/icons-vue/lib/bee/20'
import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'

const menus = defineNavbarMenu([
  {
    align: 'right',
    items: [
      {
        name : 'dashboard',
        label: 'Dashboard',
        url  : '/',
        icon : IconDashboard,
      },
      {
        name   : 'contacts',
        label  : 'Contacts',
        url    : '/',
        icon   : IconBee,
        submenu: [
          {
            name : 'children-1',
            label: 'Children 1',
            url  : '/',
          },
          {
            name : 'children-2',
            label: 'Children 2',
            url  : '/',
          },
          {
            name : 'children-2',
            label: 'Children 2',
            url  : '/',
          },
        ],
      },
    ],
  },
])

const settings = defineSetting(
  {
    fixed     : true,
    toggleable: 'lg',
    color     : 'dark',
    variant   : 'lines',
    condensed : false,
    collapse  : {
      collapsedIcon: IconBee,
      expandedIcon : IconDashboard,
    },
  },
)

it('should rendered properly without any props', () => {
  const screen = render({
    components: { pNavbarMenu },
    template  : `
      <p-navbar-menu />
    `,
  })

  const navbar = screen.queryByTestId('navbar-menu')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar')
})

it('should be able to render menus', () => {
  const screen = render({
    components: { pNavbarMenu },
    template  : '<p-navbar-menu :menus="menus" />',
    setup () {
      return { menus }
    },
  })

  const navbar    = screen.getByTestId('navbar-menu')
  const navbarNav = screen.getByTestId('navbar-nav')
  const names     = screen.getAllByText('Dashboard')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar--light')
  expect(navbarNav).toHaveClass('nav--align-right')
  expect(names).toHaveLength(1)
})

it('should be able to render menus', () => {
  const screen = render({
    components: { pNavbarMenu },
    template  : '<p-navbar-menu :menus="menus" :settings="settings" />',
    setup () {
      return { menus, settings }
    },
  })

  const navbar = screen.getByTestId('navbar-menu')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar--dark', 'navbar--lines', 'navbar--fixed', 'navbar--expand-lg')
})
