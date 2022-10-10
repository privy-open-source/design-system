<script setup>
  import pNavbarMenu from './NavbarMenu.vue'
  import pNavbarBrand from '../navbar/NavbarBrand.vue'
  import pNavbar from '../navbar/Navbar.vue'
  import { defineNavbarMenu, defineSetting } from './use-navbar-menu'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import pAvatar from '../avatar/Avatar.vue'

  const basic = defineNavbarMenu([
    {
      items: [
        {
          name : 'dashboard',
          label: 'Dashboard',
          url  : '/',
          icon : IconDashboard
        },
        // {
        //   name : 'contacts',
        //   label: 'Contacts',
        //   url  : '/',
        //   icon : IconBee,
        //   submenu: [
        //     {
        //       name: 'children-1',
        //       label: 'Children 1',
        //       url: '/'
        //     },
        //     {
        //       name: 'children-2',
        //       label: 'Children 2',
        //       url: '/'
        //     },
        //     {
        //       name: 'children-2',
        //       label: 'Children 2',
        //       url: '/'
        //     }
        //   ]
        // }
      ]
    },
  ])

  const dropdown = defineNavbarMenu([
    {
      align: 'right',
      items: [
        {
          name : 'label',
          label: 'Label',
          url  : '/',
          icon : IconBee,
          submenu: [
            {
              name: 'children-1',
              label: 'Children 1',
              url: '/'
            },
            {
              name: 'children-2',
              label: 'Children 2',
              url: '/'
            },
            {
              name: 'children-2',
              label: 'Children 2',
              url: '/'
            }
          ]
        }
      ]
    },
  ])

  const setup = defineSetting(
    {
      fixed: true,
      toggleable: 'lg',
      color: 'light'
    }
  )

  const setting = defineSetting(
    {
      fixed: true,
      toggleable: 'lg',
      color: 'light',
      variant: 'pills',
      condensed: false,
      collapse: {
        collapsedIcon: IconBee,
        expandedIcon: IconDashboard,
      }
    }
  )
</script>

<style scoped>
  .preview {
    @apply block relative;

    &--fixed {
      @apply h-36 overflow-hidden;

      .navbar--fixed {
        @apply absolute z-10;
      }
    }
  }
</style>

# Navbar Menu

## Usage

### Basic Navbar

<preview class="flex-grow">
  <p-navbar-menu :menus="basic">
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy-icon.svg" />
    </p-navbar-brand>
  </p-navbar-menu>
</preview>

```vue
<template>
  <p-navbar-menu :menus="menus">
    <p-navbar-brand>
      <img src="assets/images/logo-privy.svg" alt="" />
    </p-navbar-brand>
  </p-navbar-menu>
</template>

<script setup>
import { defineNavbarMenu } from '@privyid/persona/core'
import IconBee from '@carbon/icons-vue/lib/dashboard/20'

const menus = defineNavbarMenu([
  {
    items: [
      {
        name : 'dashboard',
        label: 'Dashboard',
        url  : '/',
        icon : IconDashboard
      },
    ]
  },
])
</script>
```
## Dropdown

<preview class="flex-grow">
  <p-navbar-menu :menus="dropdown">
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy-icon.svg" />
    </p-navbar-brand>
  </p-navbar-menu>
</preview>

```vue
<template>
  <p-navbar-menu :menus="menus">
    <p-navbar-brand>
      <img src="assets/images/logo-privy.svg" alt="" />
    </p-navbar-brand>
  </p-navbar-menu>
</template>

<script setup>
import { defineNavbarMenu } from '@privyid/persona/core'
import IconBee from '@carbon/icons-vue/lib/bee/20'

const menus = defineNavbarMenu([
  {
    align: 'right',
    items: [
      {
        name : 'label',
        label: 'Label',
        url  : '/',
        icon : IconBee,
        submenu: [
          {
            name: 'children-1',
            label: 'Children 1',
            url: '/'
          },
          {
            name: 'children-2',
            label: 'Children 2',
            url: '/'
          },
          {
            name: 'children-2',
            label: 'Children 2',
            url: '/'
          }
        ]
      }
    ]
  },
])
</script>
```

## Settings Navbar
You can settings navbar like `variant`, `color`, `fixed` etc. via `settings` prop.

<preview class="preview--fixed">
  <p-navbar-menu :menus="basic" :settings="setting">
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy-icon.svg" />
    </p-navbar-brand>
  </p-navbar-menu>
</preview>

```vue
<template>
  <p-navbar-menu :menus="menus" :settings="settings">
    <p-navbar-brand>
      <img src="assets/images/logo-privy.svg" alt="" />
    </p-navbar-brand>
  </p-navbar-menu>
</template>

<script setup>
import { defineNavbarMenu, defineSetting } from '@privyid/persona/core'
import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
import IconBee from '@carbon/icons-vue/lib/bee/20'

const menus = defineNavbarMenu([
  {
    items: [
      {
        name : 'dashboard',
        label: 'Dashboard',
        url  : '/',
        icon : IconDashboard
      },
    ]
  },
])

const settings = defineSetting(
  {
    fixed: true,
    toggleable: 'lg',
    color: 'light',
    variant: 'pills',
    condensed: false,
    collapse: {
      collapsedIcon: IconBee,
      expandedIcon: IconDashboard,
    }
  }
)
</script>
```
| Prop            |   Type    | Default     | Description                                                       |
|-----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `variant`       | `String`  | `pills`     | Navbar variant, valid value is `pills` and `lines`                |
| `color`         | `String`  | `light`     | Navbar color, valid value is `light` and `dark`                   |
| `condensed`     | `Boolean` | `false`     | Activate condensed navigation with less space                     |
| `fixed`         | `Boolean` | `false`     | Activate fixed Navbar                                             |
| `toggleable`    | `String`  | -           | Automatically expand navigation with desired breakpoint, valid value is `sm`, `md` and `lg`          |

## API

### Props

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `menus`        | `Array`   | `-`         | Menu items                                                        |
| `settings`     | `Object`  | `-`         | Settings navbar                                                   |

### Slots

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place Navbar Brand                          |
