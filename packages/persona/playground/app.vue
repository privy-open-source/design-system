<template>
  <p-navbar>
    <p-navbar-brand>
      <img
        src="https://privy-design-system.vercel.app/assets/images/logo.svg"
        alt="persona-icon"> Persona
    </p-navbar-brand>
  </p-navbar>

  <div class="flex h-full min-h-screen">
    <p-sidebar-menu :menus="menus" />

    <div>
      <div class="bg-default">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineMenu } from '@privyid/persona/core'
import IconDashboard from '@privyid/persona-icon/vue/dashboard/20.vue'
import IconDocument from '@privyid/persona-icon/vue/document-filled/20.vue'
import IconUsers from '@privyid/persona-icon/vue/user-groups/20.vue'
import IconSettings from '@privyid/persona-icon/vue/adjust/20.vue'

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
        url        : '/document',
        icon       : IconDocument,
        collapsible: true,
        submenu    : [
          {
            name : 'need-action',
            label: 'Need Action',
            url  : '/document/need-action',
          },
          {
            name : 'in-progress',
            label: 'In Progress',
            url  : '/document/in-progress',
          },
          {
            name : 'others',
            label: 'Others',
            url  : '/document/others',
          },
        ],
      },
      {
        name : 'contact',
        label: 'Contacts',
        url  : '/contact',
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
        url  : '/document/rejects',
      },
      {
        name : 'archives',
        label: 'Archives',
        url  : '/document/archives',
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
        url  : '/settings',
      },
      {
        name : 'english',
        label: 'English',
      },
    ],
  },
])
</script>
