---
title: Navbar · Components
description: Base dashboard navbar.
---

<script setup>
  import { ref } from 'vue-demi'
  import pNavbar from './Navbar.vue'
  import pNavbarBrand from './NavbarBrand.vue'
  import pNavbarNav from './NavbarNav.vue'
  import pNavbarToggle from './NavbarToggle.vue'
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
  import IconPersona from '@privyid/persona-icon/vue/persona/20.vue'
  import IconView from '@privyid/persona-icon/vue/view/20.vue'
  import IconUser from '@privyid/persona-icon/vue/user-groups/16.vue'
  import IconChevron from '@privyid/persona-icon/vue/chevron-sort/20.vue'
  import IconNotif from '@privyid/persona-icon/vue/notification/20.vue'
  import IconSearch from '@privyid/persona-icon/vue/search/20.vue'

  const menu = ref(false)
</script>

<style scoped>
  .preview {
    @apply block relative;

    &--fixed {
      @apply h-40 overflow-hidden;

      .navbar--fixed {
        @apply absolute z-10;
      }
    }
  }
</style>

# Navbar

> Base dashboard navbar.

## Usage

### Simple Navbar

<preview class="grow">
  <p-navbar>
    <p-navbar-brand>
      <img src="../../public/assets/images/icon-privy.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Home</p-nav-item>
      <p-nav-item>Products</p-nav-item>
      <p-nav-item>Solutions</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-brand>
      <img src="assets/images/icon-privy.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</template>
```

### Navbar Brand
Navbar brand is used for company, product, or project name. You can add permalink in navbar brand by prop `href`. Navbar brand can be an image or text and combination of both.

#### Text
<preview class="grow">
  <p-navbar>
    <p-navbar-brand>
      Persona
    </p-navbar-brand>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-brand>
      Persona
    </p-navbar-brand>
  </p-navbar>
</template>
```

#### Image and Text
<preview class="grow">
  <p-navbar>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo.svg" /> Persona
    </p-navbar-brand>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-brand>
      <img src="assets/images/logo.svg" /> Persona
    </p-navbar-brand>
  </p-navbar>
</template>
```

## Fixed Navbar
Fixed navbar are using `z-fixed` for z-index value. It posible to change z-index value using CSS variable `--p-navbar-z-index`. But don't forget to see the all [z-index](/foundation/variables/#z-index) variant for layer-ordering component.
<preview class="grow preview--fixed">
  <p-navbar fixed>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Home</p-nav-item>
      <p-nav-item>Products</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar fixed>
    <p-navbar-brand>
      <img src="assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Home</p-nav-item>
      <p-nav-item>Products</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## Variants
Navbar has 2 variant of nav type: `pills` and `lines`.

<preview class="grow">
  <p-navbar variant="pills" class="mb-5">
    <p-navbar-brand>
      <img src="../../public/assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
  <p-navbar variant="lines">
    <p-navbar-brand>
      <img src="../../public/assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar variant="pills">
    <p-navbar-brand>
      <img src="assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
  <p-navbar variant="lines">
    <p-navbar-brand>
      <img src="assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## Alignment
To align Navigation, use align prop in `<p-navbar-nav>`. Available value are `left`, `right` and `center`

<preview class="grow">
  <p-navbar class="mb-5">
    <p-navbar-nav align="left">
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
  <p-navbar class="mb-5">
    <p-navbar-nav align="center">
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
  <p-navbar>
    <p-navbar-nav align="right">
      <p-nav-item>Label</p-nav-item>
      <p-nav-item active>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-nav align="left">
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
  <p-navbar>
    <p-navbar-nav align="center">
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
  <p-navbar>
    <p-navbar-nav align="right">
      <p-nav-item>Label</p-nav-item>
      <p-nav-item active>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## With Icon
<preview class="grow">
  <p-navbar class="mb-5">
    <p-navbar-nav>
      <p-nav-item active>
        <template #icon>
          <IconPersona />
        </template>
        Label
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconPersona />
        </template>
        Label
      </p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar class="mb-5">
    <p-navbar-nav>
      <p-nav-item active>
        <template #icon>
          <IconPersona />
        </template>
        Label
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconPersona />
        </template>
        Label
      </p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## With Form
<preview class="grow">
  <p-navbar>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
      <p-nav-form>
        <p-input-group>
          <p-input placeholder="Search" />
          <p-button variant="input">
            Submit
          </p-button>
        </p-input-group>
      </p-nav-form>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-brand>
      <img src="assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-form>
        <p-input-group>
          <p-input placeholder="Search" />
          <p-button variant="input">
            Submit
          </p-button>
        </p-input-group>
      </p-nav-form>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## Condensed Navigation
<preview class="grow">
  <p-navbar>
    <p-navbar-nav condensed>
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-nav condensed>
      <p-nav-item active>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
      <p-nav-item>Label</p-nav-item>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## Dropdown
<preview class="grow">
  <p-navbar>
    <p-navbar-nav>
      <p-nav-item active>
        <template #icon>
          <IconPersona />
        </template>
        Label
      </p-nav-item>
      <p-nav-item-dropdown>
        <template #button-content>
          <IconPersona /> Label
        </template>
        <p-dropdown-item>Children 1</p-dropdown-item>
        <p-dropdown-item>Children 2</p-dropdown-item>
        <p-dropdown-item>Children 3</p-dropdown-item>
      </p-nav-item-dropdown>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-nav>
      <p-nav-item active>
        <template #icon>
          <IconPersona />
        </template>
        Label
      </p-nav-item>
      <p-nav-item-dropdown>
        <template #button-content>
          <IconPersona /> Label
        </template>
        <p-dropdown-item>Children 1</p-dropdown-item>
        <p-dropdown-item>Children 2</p-dropdown-item>
        <p-dropdown-item>Children 3</p-dropdown-item>
      </p-nav-item-dropdown>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## Responsive
Navbar support responsive by adding `toggleable` prop in `<p-navbar>` with available value `lg`, `md` and `sm`. Then `<p-navbar-toggle>` used with `<p-collapse is-nav>` component. Max height of navbar collapse is `20rem` by default, but it's very possible to custom it via `--p-navbar-collapse-max-height` variable.

<preview>
  <p-navbar toggleable="lg">
    <p-navbar-brand>
      <img src="../../public/assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-toggle @click="menu =! menu">
      <template #default="{ expanded }">
        <IconPersona v-if="expanded" />
        <IconView v-else />
      </template>
    </p-navbar-toggle>
    <p-collapse v-model="menu" is-nav>
      <p-navbar-nav>
        <p-nav-item active>
          Label
        </p-nav-item>
      </p-navbar-nav>
    </p-collapse>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar toggleable="lg">
    <p-navbar-brand>
      <img src="assets/images/logo.svg" />
    </p-navbar-brand>
    <p-navbar-toggle @click="menu =! menu">
      <template #default="{ expanded }">
        <IconPersona v-if="expanded" />
        <IconView v-else />
      </template>
    </p-navbar-toggle>
    <p-collapse v-model="menu" is-nav>
      <p-navbar-nav>
        <p-nav-item active>
          Label
        </p-nav-item>
      </p-navbar-nav>
    </p-collapse>
  </p-navbar>
</template>

<script setup>
  import IconPersona from '@privyid/persona-icon/vue/persona/20.vue'
  import IconView from '@privyid/persona-icon/vue/view/20.vue'

  const menu = ref(false)
</script>
```

## Custom
<preview class="grow">
  <p-navbar>
    <div class="flex flex-row">
      <div class="transition-all duration-200 ease-in-out basis-2/4 focus-within:basis-full">
        <p-navbar-nav>
          <p-input-group>
            <p-input-group-addon>
              <IconSearch />
            </p-input-group-addon>
            <p-input placeholder="Search" />
          </p-input-group>
        </p-navbar-nav>
      </div>
    </div>
     <p-navbar-nav align="right">
      <p-nav-item>
        <template #icon>
          <IconNotif />
        </template>
      </p-nav-item>
      <p-nav-item-dropdown no-caret size="xs" variant="outline">
        <template #button-content>
          <span class="flex items-center space-x-2">
            <p-avatar size="xs">
              <IconUser />
            </p-avatar>
            <span class="block text-left">
              <span class="text-sm">Tarjono Sujono</span>
              <p-caption size="xs">Personal Account</p-caption>
            </span>
            <IconChevron />
          </span>
        </template>
        <p-dropdown-item>Edit Profile</p-dropdown-item>
        <p-dropdown-item>Preference</p-dropdown-item>
        <p-dropdown-item>Sign out</p-dropdown-item>
      </p-nav-item-dropdown>
      <p-nav-text>
        <p-avatar src="https://picsum.photos/50" />
      </p-nav-text>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <div class="flex flex-row">
      <div class="transition-all duration-200 ease-in-out basis-2/4 focus-within:basis-full">
        <p-navbar-nav>
          <p-input-group>
            <p-input-group-addon>
              <IconSearch />
            </p-input-group-addon>
            <p-input placeholder="Search" />
          </p-input-group>
        </p-navbar-nav>
      </div>
    </div>
     <p-navbar-nav align="right">
      <p-nav-item>
        <template #icon>
          <IconNotif />
        </template>
      </p-nav-item>
      <p-nav-item-dropdown no-caret size="xs" variant="outline">
        <template #button-content>
          <span class="flex items-center space-x-2">
            <p-avatar size="xs">
              <IconUser />
            </p-avatar>
            <span class="block text-left">
              <span class="text-sm">Tarjono Sujono</span>
              <p-caption size="xs">Personal Account</p-caption>
            </span>
            <IconChevron />
          </span>
        </template>
        <p-dropdown-item>Edit Profile</p-dropdown-item>
        <p-dropdown-item>Preference</p-dropdown-item>
        <p-dropdown-item>Sign out</p-dropdown-item>
      </p-nav-item-dropdown>
      <p-nav-text>
        <p-avatar src="https://picsum.photos/50" />
      </p-nav-text>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## Navbar with CTA
<preview class="grow">
  <p-navbar>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Home</p-nav-item>
      <p-nav-item>Products</p-nav-item>
    </p-navbar-nav>
    <p-navbar-nav align="right">
      <p-nav-form>
        <p-button href="#" variant="link">Login</p-button>
        <p-button href="#" color="info">Create Free Account</p-button>
      </p-nav-form>
    </p-navbar-nav>
  </p-navbar>
</preview>

```vue
<template>
  <p-navbar>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Home</p-nav-item>
      <p-nav-item>Products</p-nav-item>
    </p-navbar-nav>
    <p-navbar-nav align="right">
      <p-nav-form>
        <p-button href="#" variant="link">Login</p-button>
        <p-button href="#" color="info">Create Free Account</p-button>
      </p-nav-form>
    </p-navbar-nav>
  </p-navbar>
</template>
```

## Variables
Navbar use local CSS variables on `.navbar` for enhanced real-time customization.

```sass
--p-navbar-z-index: theme(zIndex.fixed);
--p-navbar-sticky-top: theme(spacing.0);
--p-navbar-collapse-max-height: 20rem; /* 320px */
--p-navbar-padding-x: theme(spacing.3);
--p-navbar-padding-left: var(--p-navbar-padding-x);
--p-navbar-padding-right: var(--p-navbar-padding-x);
--p-navbar-padding-y: theme(spacing.3);
--p-navbar-padding-top: var(--p-navbar-padding-y);
--p-navbar-padding-bottom: var(--p-navbar-padding-y);
--p-navbar-bg: theme(backgroundColor.default.DEFAULT);
--p-navbar-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
--p-navbar-shadow: none;
--p-navbar-shadow-on-scroll: theme(boxShadow.lg);
```
## API

### Props `<p-navbar>`
| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `variant`      | `String`  | `pills`     | Navbar variant, valid value is `pills` and `lines`                |
| `condensed`    | `Boolean` | `false`     | Activate condensed navigation with less space                     |
| `fixed`        | `Boolean` | `false`     | Activate fixed Navbar                                             |
| `sticky`       | `Boolean` | `false`     | Activate sticky Navbar                                             |
| `toggleable`   | `String`  | -           | automatically expand navigation with desired breakpoint           |
### Slots `<p-navbar>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Navbar                          |

### Props `<p-navbar-brand>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `href`         | `String`  | `undefined` | Target URL of the Navbar Brand link                               |

### Slots `<p-navbar-brand>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Navbar Brand                    |

### Props `<p-navbar-nav>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `align`        | `String`  | `left`     | Navbar alignment, valid value is `left`, `center` and `right`      |

### Slots `<p-navbar-nav>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Navbar Nav                      |

### Props `<p-navbar-toggle>`

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" class="text-center">There no prop here</td>
    </tr>
  </tbody>
</table>

### Slots `<p-navbar-toggle>`

| Name             | Description                                                            |
|------------------|------------------------------------------------------------------------|
| `default`        | Content to place expanded or collapsed icon in the Navbar Toggle       |

### Events `<p-navbar-toggle>`

| Name    | Arguments               | Description                         |
|---------|-------------------------|-------------------------------------|
| `click` | Native DOM Event object | Event when navbar toggle is clicked |
