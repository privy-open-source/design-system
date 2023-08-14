---
title: Breadcrumbs · Components
description: The current page's location within a navigational hierarchy
---

<script setup>
  import pBreadcrumb from './Breadcrumb.vue'
  import pBreadcrumbItem from './BreadcrumbItem.vue'
  import pBreadcrumbItemDropdown from './BreadcrumbItemDropdown.vue'
  import { defineNavigation } from '.'
  import pDropdownItem from '../dropdown/DropdownItem.vue'
  import PiArrowRight16 from '@privyid/persona-icon/vue/arrow-right/16.vue'

  const items = defineNavigation([
    {
      text: 'Dashboard',
      href: '/'
    },
    {
      text: 'All Documents',
      active: true
    }
  ])

  const itemsB = defineNavigation([
    {
      text: 'Dashboard',
      href: '#',
    },
    {
      text: 'Document',
      active: true,
      subitem: [
        {
          text: 'Waiting',
          href: '#',
          active: true,
        },
        {
          text: 'Done',
          href: '#'
        },
        {
          text: 'Archived',
          href: '#'
        }
      ]
    },
  ])
</script>

# Breadcrumbs

> The current page's location within a navigational hierarchy

## Usage

### Simple Usage

Items of breadcrumbs are rendered using `items` prop. It can be an array of object to provide text, link and active state.

<preview>
  <p-breadcrumb :items="items" />
</preview>

```vue
<script>
  import { defineNavigation } from '@privyid/persona/core'

  const items = defineNavigation([
    {
      text: 'Dashboard',
      href: '/'
    },
    {
      text: 'All Documents',
      active: true
    }
  ])
</script>

<template>
  <p-breadcrumb :items="items" />
</template>
```

### Breadcrumb with / Divider

<preview>
  <p-breadcrumb :items="items">
    <template #divider>
      /
    </template>
  </p-breadcrumb>
</preview>

```vue
<template>
  <p-breadcrumb :items="items">
    <template #divider>
      /
    </template>
  </p-breadcrumb>
</template>
```

## Breadcrumb Item
Individual `<p-breadcrumb-item>` can be placed manually in the default slot of `<p-breadcrumb>`. The permalink can be set with `href` prop, then `active` prop for active state.

<preview>
  <p-breadcrumb>
    <p-breadcrumb-item href="#dashboard">
      Dashboard
    </p-breadcrumb-item>
    <p-breadcrumb-item href="#user">
      User Profile
    </p-breadcrumb-item>
    <p-breadcrumb-item active>
      Change Password
    </p-breadcrumb-item>
  </p-breadcrumb>
</preview>

```vue
<template>
  <p-breadcrumb>
    <p-breadcrumb-item href="#dashboard">
      Dashboard
    </p-breadcrumb-item>
    <p-breadcrumb-item href="#user">
      User Profile
    </p-breadcrumb-item>
    <p-breadcrumb-item active>
      Change Password
    </p-breadcrumb-item>
  </p-breadcrumb>
</template>
```

## Breadcrumb Dropdown

<preview>
  <p-breadcrumb :items="itemsB" />
</preview>

```vue
<template>
  <script>
    import { defineNavigation } from '@privyid/persona/core'

    const items = defineNavigation([
      {
        text: 'Dashboard',
        href: '#',
      },
      {
        text: 'Document',
        active: true,
        subitem: [
          {
            text: 'Waiting',
            href: '#',
            active: true,
          },
          {
            text: 'Done',
            href: '#'
          },
          {
            text: 'Archived',
            href: '#'
          }
        ]
      },
    ])
  </script>

  <p-breadcrumb :items="items" />
</template>
```

`<p-breadcrumb-item-dropdown>` also can be placed manually in the default slot of `<p-breadcrumb>` with the combination of `<p-dropdown-item>` child component.

<preview>
  <p-breadcrumb>
    <p-breadcrumb-item href="#dashboard">
      Dashboard
    </p-breadcrumb-item>
    <p-breadcrumb-item href="#settings">
      Settings
    </p-breadcrumb-item>
    <p-breadcrumb-item-dropdown text="Account" active>
      <p-dropdown-item href="#">
        Change Password
      </p-dropdown-item>
      <p-dropdown-item href="#" active>
        Create Signature
      </p-dropdown-item>
      <p-dropdown-item href="#">
        Change OTP Method
      </p-dropdown-item>
    </p-breadcrumb-item-dropdown>
  </p-breadcrumb>
</preview>

```vue
<template>
  <p-breadcrumb>
    <p-breadcrumb-item href="#dashboard">
      Dashboard
    </p-breadcrumb-item>
    <p-breadcrumb-item href="#settings">
      Settings
    </p-breadcrumb-item>
    <p-breadcrumb-item-dropdown text="Account" active>
      <p-dropdown-item href=#>
        Change Password
      </p-dropdown-item>
      <p-dropdown-item href="#" active>
        Create Signature
      </p-dropdown-item>
      <p-dropdown-item href="#">
        Change OTP Method
      </p-dropdown-item>
    </p-breadcrumb-item-dropdown>
  </p-breadcrumb>
</template>
```


## API

### Props `<p-breadcrumb>`

| Props   |  Type   | Default | Description                        |
|---------|:-------:|:-------:|------------------------------------|
| `items` | `Array` |   `-`   | Breadcrumb items (array of object) |

### Slots `<p-breadcrumb>`

| Name      | Description                                         |
|-----------|-----------------------------------------------------|
| `default` | Content to place breadcrumb item                    |
| `divider` | Specifies the dividing character/icon between items |

### Props `<p-breadcrumb-item>`

| Props    |   Type    | Default | Description                            |
|----------|:---------:|:-------:|----------------------------------------|
| `text`   | `String`  |   `-`   | Breadcrumb item label                  |
| `active` | `Boolean` | `false` | Breadcrumb item active state           |
| `href`   | `String`  |   `-`   | Target URL of the breadcrumb item link |

### Slots `<p-breadcrumb-item>`

| Name      | Description                            |
|-----------|----------------------------------------|
| `default` | Content to place breadcrumb item label |

### Props `<p-breadcrumb-item-dropdown>`

| Props    |   Type    | Default | Description                                               |
|----------|:---------:|:-------:|-----------------------------------------------------------|
| `text`   | `String`  |   `-`   | Breadcrumb item dropdown activator label                  |
| `active` | `Boolean` | `false` | Breadcrumb item dropdown activator active state           |
| `href`   | `String`  |   `-`   | Target URL of the breadcrumb item dropdown activator link |

### Slots `<p-breadcrumb-item-dropdown>`

| Name      | Description                    |
|-----------|--------------------------------|
| `default` | Content to place dropdown item |

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
