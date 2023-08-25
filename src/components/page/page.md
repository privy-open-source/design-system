<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import pNavbar from '../navbar/Navbar.vue'
  import pNavbarBrand from '../navbar/NavbarBrand.vue'
  import pNavbarNav from '../navbar/NavbarNav.vue'
  import pNavbarToggle from '../navbar/NavbarToggle.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pNavItemDropdown from '../nav/NavItemDropdown.vue'
  import pDropdownItem from '../dropdown/DropdownItem.vue'
  import pNavForm from '../nav/NavForm.vue'
  import pNavText from '../nav/NavText.vue'
  import pInput from '../input/Input.vue'
  import pInputGroup from '../input-group/InputGroup.vue'
  import pInputGroupAddon from '../input-group/InputGroupAddon.vue'
  import pDivider from '../divider/Divider.vue'
  import pButton from '../button/Button.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import pCollapse from '../collapse/Collapse.vue'
  import pCaption from '../caption/Caption.vue'

  import { defineMenu } from '../sidebar-menu'
  import pSidebarMenu from '../sidebar-menu/SidebarMenu.vue'
  import IconDashboard from '@privyid/persona-icon/vue/dashboard/20.vue'
  import IconDocument from '@privyid/persona-icon/vue/document-filled/20.vue'
  import IconUsers from '@privyid/persona-icon/vue/user-groups/20.vue'

  import Main from '../main/Main.vue'


  /**
   * sidebar
   */
  const basic  = defineMenu([
    {
      items: [
        {
          name : 'dashboard',
          label: 'Dashboard',
          url  : '/',
          icon : IconDashboard
        },
        {
          name : 'documents',
          label: 'Documents',
          url  : '/documents',
          icon : IconDocument
        },
        {
          name : 'contacts',
          label: 'Contacts',
          url  : '/contacts',
          icon : IconUsers
        },
      ]
    },
  ])
</script>

<p-navbar sticky style="--p-navbar-sticky-top: 60px">
  <p-navbar-brand>
    <img src="../../public/assets/images/icon-privy.svg" />
  </p-navbar-brand>
  <p-navbar-nav>
    <p-nav-item active>Home</p-nav-item>
    <p-nav-item>Products</p-nav-item>
    <p-nav-item>Solutions</p-nav-item>
  </p-navbar-nav>
</p-navbar>

<Main>
  <div class="flex flex-row h-screen">
    <div class="flex-shrink-0 bg-base">
      <p-sidebar-menu :menus="basic" style="--p-sidebar-bg: rgb(243,243,243)">
      </p-sidebar-menu>
    </div>
    <div class="p-4">
      <p>Lorem ipsum dolor sit amet</p>
      <div class="flex-cols gap-x-3">
        <p-button variant="outline" color="info">Button</p-button>
        <p-button color="info">Button</p-button>
        <p-button variant="ghost" color="info">Button</p-button>
        <p-button variant="link" color="info">Button</p-button>
      </div>
    </div>
  </div>
</Main>