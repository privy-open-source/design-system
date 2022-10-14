<template>
  <p-sidebar-menu :menus="menus">
    <p-sidebar-brand>
      <img
        src="https://privy-design-system.vercel.app/assets/images/logo.svg"
        alt="persona-icon">
    </p-sidebar-brand>
  </p-sidebar-menu>
</template>

<script setup>
import { defineMenu } from '@privyid/persona/core'
import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
import IconDocument from '@carbon/icons-vue/lib/document/20'
import IconUsers from '@carbon/icons-vue/lib/group/20'

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
        name : 'documents',
        label: 'Documents',
        url  : '/',
        icon : IconDocument,
      },
      {
        name : 'contacts',
        label: 'Contacts',
        url  : '/',
        icon : IconUsers,
      },
    ],
  },
])
</script>
