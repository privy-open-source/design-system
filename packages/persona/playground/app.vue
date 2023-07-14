<template>
  <p-navbar>
    <p-navbar-brand>
      <img
        src="https://privy-design-system.vercel.app/assets/images/logo.svg"
        alt="persona-icon"> Persona
    </p-navbar-brand>
  </p-navbar>
  <p-sidebar-menu :menus="menus" />
</template>

<script lang="ts" setup>
import { defineMenu } from '@privyid/persona/core'
import IconDashboard from '@privyid/persona-icon/vue/dashboard/20.vue'
import IconDocument from '@privyid/persona-icon/vue/document-filled/20.vue'
import IconUsers from '@privyid/persona-icon/vue/user-groups/20.vue'

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
