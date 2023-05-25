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


<p-sidebar-menu fixed :menus="fixed" type="wide" align="right">
  <template #brand>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </template>
</p-sidebar-menu>