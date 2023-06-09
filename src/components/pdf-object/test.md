<script setup>
  import { ref } from 'vue-demi'
  import pSidebarMenu from '../sidebar-menu/SidebarMenu.vue'
  import pSidebarBrand from '../sidebar/SidebarBrand.vue'
  import { defineMenu } from '../sidebar-menu/'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconUsers from '@carbon/icons-vue/lib/group/20'
  import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'
  import IconEN from '../../public/assets/images/img-flag.svg'

  import pNavbar from '../navbar/Navbar.vue'
  import pNavbarBrand from '../navbar/NavbarBrand.vue'
  import pNavbarNav from '../navbar/NavbarNav.vue'
  import pNavbarToggle from '../navbar/NavbarToggle.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pNavItemDropdown from '../nav/NavItemDropdown.vue'
  import pDropdownItem from '../dropdown/DropdownItem.vue'
  import pNavForm from '../nav/NavForm.vue'
  import pNavText from '../nav/NavText.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import IconUser from '@carbon/icons-vue/lib/events/16'
  import pCollapse from '../collapse/Collapse.vue'

  const fixed = defineMenu([
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
              url  : '/'
            },
            {
              name : 'in-progress',
              label: 'In Progress',
              url  : '/'
            },
            {
              name : 'others',
              label: 'Others',
              url  : '/'
            },
          ]
        },
        {
          name : 'contact',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        },
      ]
    },
    {
      condensed: true,
      title: 'Quick Jump',
      items: [
        {
          name : 'rejects',
          label: 'Rejects',
          url  : '/',
        },
        {
          name: 'archives',
          label: 'Archives',
          url: '/',
        },
      ]
    },
    {
      bottom: true,
      items: [
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
          icon : IconEN
        },
      ]
    },
  ])

  const menu = ref(false)
</script>


<p-sidebar-menu fixed :menus="fixed" type="wide" align="right">
  <template #brand>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </template>
</p-sidebar-menu>

<p-navbar fixed toggleable="all">
  <p-navbar-brand>
    <img src="../../public/assets/images/logo.svg" />
  </p-navbar-brand>
  <p-navbar-toggle @click="menu =! menu" />
  <p-collapse v-model="menu" is-nav>
    <p-navbar-nav>
      <p-nav-item active>
        Label
      </p-nav-item>
      <p-nav-item-dropdown menu-size="md">
        <template #button-content>
          label
        </template>
        <p-dropdown-item href="#adf">Edit Profile</p-dropdown-item>
        <p-dropdown-item>Preference</p-dropdown-item>
        <p-dropdown-item>Sign out</p-dropdown-item>
      </p-nav-item-dropdown>
    </p-navbar-nav>
  </p-collapse>
</p-navbar>