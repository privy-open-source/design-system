import { render, fireEvent } from '@testing-library/vue'
import { delay } from 'nanodelay'
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

const simpleMenus = defineNavbarMenu([
  {
    align: 'right',
    items: [
      {
        name   : 'contacts',
        label  : 'Contacts',
        url    : '/',
        icon   : '../../public/assets/images/logo-privy-icon.svg',
        submenu: [
          {
            name : 'children-1',
            label: 'Children 1',
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

const settingSimple = defineSetting(
  {
    fixed     : true,
    toggleable: 'lg',
    variant   : 'pills',
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

  const navbar          = screen.getByTestId('navbar-menu')
  const navbarNav       = screen.getByTestId('navbar-nav')
  const names           = screen.getAllByText('Dashboard')
  const navItemDropdown = screen.getByTestId('dropdown-activator')
  const dropdownIcon    = screen.getByTestId('dropdown-icon')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar--light')
  expect(navbarNav).toHaveClass('nav--align-right')
  expect(navItemDropdown).toHaveClass('btn--icon')
  expect(dropdownIcon).toBeInTheDocument()
  expect(names).toHaveLength(1)
})

it('should be able to render menus', async () => {
  const screen = render({
    components: { pNavbarMenu },
    template  : '<p-navbar-menu :menus="menus" :settings="settings" />',
    setup () {
      return { menus, settings }
    },
  })

  const navbar         = screen.getByTestId('navbar-menu')
  const toggle         = screen.getByTestId('navbar-toggle')
  const navbarCollapse = screen.getByTestId('collapse')
  const expandedIcon   = screen.getByTestId('expanded-icon')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar--dark', 'navbar--lines', 'navbar--fixed', 'navbar--expand-lg')
  expect(toggle).toBeInTheDocument()
  expect(toggle).toHaveClass('navbar__toggle--lg')
  expect(navbarCollapse).toBeInTheDocument()
  expect(expandedIcon).toBeInTheDocument()

  await fireEvent.click(toggle)
  await delay(0)

  const collapsedIcon = screen.getByTestId('collapsed-icon')

  expect(collapsedIcon).toBeVisible()
})

it('should be able to collapse and expand menus', async () => {
  const screen = render({
    components: { pNavbarMenu },
    template  : '<p-navbar-menu :menus="simpleMenus" :settings="settingSimple" />',
    setup () {
      return { simpleMenus, settingSimple }
    },
  })

  const navbar        = screen.getByTestId('navbar-menu')
  const toggle        = screen.getByTestId('navbar-toggle')
  const collapsedIcon = screen.getByTestId('default-collapsed-icon')
  const dropdownIcon  = screen.getByTestId('dropdown-icon-image')

  expect(navbar).toBeInTheDocument()
  expect(navbar).toHaveClass('navbar--pills', 'navbar--fixed', 'navbar--expand-lg')
  expect(toggle).toBeInTheDocument()
  expect(toggle).toHaveClass('navbar__toggle--lg')
  expect(collapsedIcon).toBeVisible()
  expect(dropdownIcon).toBeInTheDocument()

  await fireEvent.click(toggle)
  await delay(0)

  const expandedIcon = screen.getByTestId('default-expanded-icon')

  expect(expandedIcon).toBeVisible()
})
