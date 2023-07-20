---
title: Sidebar Menu · Components
description: Define sidebar using JSON
---

<script setup>
  import pSidebarMenu from './SidebarMenu.vue'
  import { ref } from 'vue-demi'
  import pSidebarBrand from '../sidebar/SidebarBrand.vue'
  import { defineMenu } from '.'
  import IconDashboard from '@privyid/persona-icon/vue/dashboard/20.vue'
  import IconDocument from '@privyid/persona-icon/vue/document-filled/20.vue'
  import IconUsers from '@privyid/persona-icon/vue/user-groups/20.vue'
  import IconSettings from '@privyid/persona-icon/vue/adjust/20.vue'
  import IconEN from '../../public/assets/images/img-flag.svg'

  const modelA   = ref(false)

  const basic = defineMenu([
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
          url  : '/',
          icon : IconDocument
        },
        {
          name : 'contacts',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        },
      ]
    },
  ])

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
            }
          ]
        },
        {
          name : 'contact',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        }
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

  const narrow = defineMenu([
    {
      items: [
        {
          name: 'dashboard',
          url : '/',
          icon: IconDashboard
        },
        {
          name: 'document',
          url : '/',
          icon: IconDocument
        },
        {
          name: 'users',
          url : '/',
          icon: IconUsers
        }
      ]
    },
    {
      bottom: true,
      items : [
        {
          name: 'settings',
          url : '/',
          icon: IconSettings
        },
        {
          name : 'language',
          label: 'ENG',
          url  : '/',
          icon : IconEN,
        }
      ]
    }
  ])

  const limit = defineMenu([
    {
      maxLength: 2,
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
        },
        {
          name : 'contact',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        },
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
  ])
</script>
<style scoped lang="postcss">
  .preview {
    @apply block h-[28rem] overflow-hidden;

    &.higher {
      @apply h-[35rem];
    }

    .sidebar--fixed {
      @apply absolute;
    }
  }
</style>

# Sidebar Menu

> Define sidebar using JSON

## Usage

### Basic Sidebar

<preview class="flex-col space-y-2">
  <p-sidebar-menu :menus="basic">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</preview>

<preview class="flex-col space-y-2">
  <p-sidebar-menu :menus="basic">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</preview>

```vue
<template>
  <p-sidebar-menu :menus="menus">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</template>

<script setup>
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
        icon : IconDashboard
      },
      {
        name : 'documents',
        label: 'Documents',
        url  : '/',
        icon : IconDocument
      },
      {
        name : 'contacts',
        label: 'Contacts',
        url  : '/',
        icon : IconUsers
      }
    ]
  },
])
</script>
```

### Fixed Sidebar

<preview class="flex-col space-y-2 higher">
  <p-sidebar-menu fixed :menus="fixed">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</preview>

```vue
<template>
  <p-sidebar-menu fixed :menus="menus">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</template>

<script setup>
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
          }
        ]
      },
      {
        name : 'contact',
        label: 'Contacts',
        url  : '/',
        icon : IconUsers
      }
    ]
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
        icon : './assets/images/img-flag.svg'
      },
    ]
  },
])
</script>
```

### Narrow Sidebar

<preview class="flex-col space-y-2 higher">
  <p-sidebar-menu fixed :menus="narrow" type="narrow">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</preview>

```vue
<template>
  <p-sidebar-menu fixed :menus="menus" type="narrow">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</template>

<script setup>
import { defineMenu } from '@privyid/persona/core'
import IconDashboard from '@privyid/persona-icon/vue/dashboard/20.vue'
import IconDocument from '@privyid/persona-icon/vue/document-filled/20.vue'
import IconUsers from '@privyid/persona-icon/vue/user-groups/20.vue'
import IconSettings from '@privyid/persona-icon/vue/adjust/20.vue'

const menus = defineMenu([
  {
    items: [
      {
        name: 'dashboard',
        url : '/',
        icon: IconDashboard
      },
      {
        name: 'document',
        url : '/',
        icon: IconDocument
      },
      {
        name: 'users',
        url : '/',
        icon: IconUsers
      }
    ]
  },
  {
    bottom: true,
    items: [
      {
        name: 'settings',
        url : '/',
        icon: IconSettings
      },
      {
        name : 'language',
        label: 'ENG',
        url  : '/',
        icon : '/assets/images/img-flag.svg'
      }
    ]
  }
])
</script>
```

## Limiting Menus
Limiting how much menu-item would be displayed is possible by setup it from `maxLength`.

<preview class="flex-col space-y-2 higher">
  <p-sidebar-menu fixed :menus="limit">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</preview>

```vue
<template>
  <p-sidebar-menu fixed :menus="menus">
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
</template>

<script setup>
import { defineMenu } from '@privyid/persona/core'
import IconDashboard from '@privyid/persona-icon/vue/dashboard/20.vue'
import IconDocument from '@privyid/persona-icon/vue/document-filled/20.vue'
import IconUsers from '@privyid/persona-icon/vue/user-groups/20.vue'

const limit = defineMenu([
  {
    maxLength: 2,
    items: [
      {
        name : 'dashboard',
        label: 'Dashboard',
        url  : '/',
        icon : IconDashboard,
      },
      {
        name: 'document',
        label: 'Documents',
        url: '/',
        icon: IconDocument,
      },
      {
        name : 'contact',
        label: 'Contacts',
        url  : '/',
        icon : IconUsers
      },
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
])
</script>
```

## API

### Props

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `align`        | `String`  | `left`      | Sidebar alignment, valid value is `left` and `right`              |
| `type`         | `String`  | `wide`      | Sidebar type, valid value is `wide` and `narrow`                  |
| `fixed`        | `Boolean` | `false`     | Activate fixed Sidebar                                            |
| `menus`        | `Array`   | `-`         | Menu items                                                        |
| `showMoreText` | `String`  | `More`      | Text for show more's button                                       |
| `showLessText` | `String`  | `Less`      | Text for show less's button                                       |

### Slots

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place Sidebar Brand                          |
| `bottom`         | Content to place in the Sidebar bottom                  |

### Events

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>
