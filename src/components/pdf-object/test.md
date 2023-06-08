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

  import pSidebar from '../sidebar/Sidebar.vue'
  import pSidebarNav from '../sidebar/SidebarNav.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pNavSubItem from '../nav/NavSubItem.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import pBanner from '../banner/Banner.vue'
  import pCard from '../card/Card.vue'
  import pCaption from '../caption/Caption.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import pButton from '../button/Button.vue'
  import IconGroup from '@carbon/icons-vue/lib/group/20'
  import IconDataStructured from '@carbon/icons-vue/lib/data--structured/20'
  import IconCheck from '@carbon/icons-vue/lib/checkmark/20'
  import IconClose from '@carbon/icons-vue/lib/close/20'
  import IconSignOut from '@carbon/icons-vue/lib/logout/20'

  const model   = ref(false)
  const modelA  = ref(false)

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
</script>


<!-- <p-sidebar-menu fixed :menus="fixed" type="wide" align="right">
  <p-sidebar-brand>
    <img src="/assets/images/logo-privy.svg" alt="" />
  </p-sidebar-brand>
</p-sidebar-menu> -->

<p-sidebar fixed>
  <p-sidebar-nav />
</p-sidebar>

<!-- <p-sidebar fixed>
  <template #brand>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
      <span class="flex items-center justify-between w-full my-3 space-x-3">
        <span class="flex items-center space-x-3">
          <p-avatar size="sm" name="James Smith" />
          <span class="text-left">
            <p-text variant="body2" transform="capitalize">My Profile</p-text>
            <p-caption size="tn">UAT003</p-caption>
          </span>
        </span>
        <p-button variant="link" size="sm" icon>
          <IconSignOut />
        </p-button>
      </span>
    </p-sidebar-brand>
  </template>
  <p-sidebar-nav>
    <p-nav-item active>Documents</p-nav-item>
    <p-nav-item>Contacts</p-nav-item>
    <p-nav-item>Structure</p-nav-item>
  </p-sidebar-nav>
  <p-sidebar-nav title="Main">
    <p-nav-item active>Documents</p-nav-item>
    <p-nav-item>Contacts</p-nav-item>
    <p-nav-item>Structure</p-nav-item>
    <p-nav-item>Structure</p-nav-item>
  </p-sidebar-nav>
  <p-sidebar-nav title="Main">
    <p-nav-item>Contacts</p-nav-item>
    <p-nav-item>Structure</p-nav-item>
    <p-nav-item>Contacts</p-nav-item>
  </p-sidebar-nav>
  <p-sidebar-nav bottom>
    <p-nav-item active>Contacts</p-nav-item>
  </p-sidebar-nav>
</p-sidebar> -->