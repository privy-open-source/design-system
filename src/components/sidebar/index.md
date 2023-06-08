---
title: Sidebar · Components
description: Base dashboard sidebar menu.
---

<script setup>
  import pSidebar from './Sidebar.vue'
  import pSidebarNav from './SidebarNav.vue'
  import pSidebarBrand from './SidebarBrand.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pNavSubItem from '../nav/NavSubItem.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import pBanner from '../banner/Banner.vue'
  import pCard from '../card/Card.vue'
  import pCaption from '../caption/Caption.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconGroup from '@carbon/icons-vue/lib/group/20'
  import IconDataStructured from '@carbon/icons-vue/lib/data--structured/20'
  import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import IconCheck from '@carbon/icons-vue/lib/checkmark/20'
  import IconClose from '@carbon/icons-vue/lib/close/20'
  import { ref } from "vue-demi"

  const model   = ref(false)
  const modelA  = ref(false)
</script>

<style scoped>
  .preview {
    @apply block h-96 overflow-hidden;

    &--fixed {
      .sidebar--fixed {
        @apply absolute;
      }
    }
  }
</style>

# Sidebar

> Base dashboard sidebar menu

## Usage

### Basic Sidebar

<preview>
  <p-sidebar>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav title="Main">
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

### Fixed Sidebar
Fixed sidebar are using z-fixed for z-index value. It posible to change z-index value using `--p-sidebar-z-index` CSS variable. But don't forget to see the all [z-index](/foundation/variables/#z-index) variant for layer-ordering component.
<preview class="preview--fixed">
  <p-sidebar fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

## Alignment
To align Sidebar, use align prop. Available value are `left` and `right`
<preview class="preview--fixed">
<p-sidebar fixed align="right">
  <template #brand>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </template>
  <p-sidebar-nav>
    <p-nav-item active>Documents</p-nav-item>
    <p-nav-item>Contacts</p-nav-item>
    <p-nav-item>Structure</p-nav-item>
  </p-sidebar-nav>
</p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed align="right">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```
## Condensed
When you need less space/padding of sidebar navigation, you can set by using `condensed` prop.

<preview class="preview--fixed">
<p-sidebar fixed>
  <template #brand>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </template>
  <p-sidebar-nav condensed>
    <p-nav-item active>Documents</p-nav-item>
    <p-nav-item>Contacts</p-nav-item>
    <p-nav-item>Structure</p-nav-item>
  </p-sidebar-nav>
</p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav condensed>
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

## Types
Sidebar has 2 types, `wide` and `narrow`. Default is `wide`. In variant `narrow`, you can place your navigation with icon-only or icon-label.

### Icon Only
<preview class="preview--fixed">
  <p-sidebar fixed type="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDocument />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconGroup />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDataStructured />
        </template>
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed variant="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDocument />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDocument />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDataStructured />
        </template>
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```
### Icon with Label

<preview class="preview--fixed">
  <p-sidebar fixed type="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDocument />
        </template>
        Docs
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconGroup />
        </template>
        Users
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDataStructured />
        </template>
        Struct
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed type="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDocument />
        </template>
        Docs
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconGroup />
        </template>
        Users
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDataStructured />
        </template>
        Struct
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

### Bottom Menus
If you need to place menus in the bottom, you just add `bottom` prop in your `<p-sidebar-nav>`

<preview class="preview--fixed">
  <p-sidebar fixed type="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav bottom>
      <p-nav-item active>
        <template #icon>
          <IconSettings />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <img src="/assets/images/icon-flag.svg"/>
        </template>
        ENG
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed type="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav bottom>
      <p-nav-item active>
        <template #icon>
          <IconSettings />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <img src="/assets/images/icon-flag.svg"/>
        </template>
        ENG
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

## Submenu
Submenu just works in `wide` type. If you need collapsible menus, you just add `collapsible` prop in your `<p-nav-sub-item>`

### Default Submenu

<preview class="preview--fixed">
<p-sidebar fixed>
  <template #brand>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </template>
  <p-sidebar-nav>
    <p-nav-item active>
      <template #icon>
        <IconDashboard />
      </template>
      Dashboard
    </p-nav-item>
    <p-nav-sub-item text="Documents">
      <template #icon>
        <IconDocument />
      </template>
      <p-sidebar-nav id="chld-1">
        <p-nav-item>
          Need Action
        </p-nav-item>
        <p-nav-item>
          In Progress
        </p-nav-item>
        <p-nav-item>
          Others
        </p-nav-item>
      </p-sidebar-nav>
    </p-nav-sub-item>
  </p-sidebar-nav>
</p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDashboard />
        </template>
        Dashboard
      </p-nav-item>
      <p-nav-sub-item text="Documents">
        <template #icon>
          <IconDocument />
        </template>
        <p-sidebar-nav id="chld-1">
          <p-nav-item>
            Need Action
          </p-nav-item>
          <p-nav-item>
            In Progress
          </p-nav-item>
          <p-nav-item>
            Others
          </p-nav-item>
        </p-sidebar-nav>
      </p-nav-sub-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

### Collapsible Menus

<preview class="preview--fixed">
<p-sidebar fixed>
  <template #brand>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </template>
  <p-sidebar-nav>
    <p-nav-item active>
      <template #icon>
        <IconDashboard />
      </template>
      Dashboard
    </p-nav-item>
    <p-nav-sub-item text="Documents" collapsible>
      <template #icon>
        <IconDocument />
      </template>
      <p-sidebar-nav id="chld-1">
        <p-nav-item>
          Need Action
        </p-nav-item>
        <p-nav-item>
          In Progress
        </p-nav-item>
        <p-nav-item>
          Others
        </p-nav-item>
      </p-sidebar-nav>
    </p-nav-sub-item>
  </p-sidebar-nav>
</p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDashboard />
        </template>
        Dashboard
      </p-nav-item>
      <p-nav-sub-item text="Documents" collapsible>
        <template #icon>
          <IconDocument />
        </template>
        <p-sidebar-nav id="chld-1">
          <p-nav-item>
            Need Action
          </p-nav-item>
          <p-nav-item>
            In Progress
          </p-nav-item>
          <p-nav-item>
            Others
          </p-nav-item>
        </p-sidebar-nav>
      </p-nav-sub-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

## Toggleable
Toggleable-feature can be used for responsive purpose. It can be toggle the sidebar via `toggleable` props. It also can toggle-hide or toggle-show automatically if certain breakpoint condition have been met. There are at least 4 breakpoints available: `all`, `lg`, `md` and `sm`.

<p-banner :dismissable="false">
  Please resize the browser to see
  the demo works.
</p-banner>

<preview class="preview--fixed">
  <div class="flex justify-end">
    <p-checkbox appearance="none" v-model="model">
      <template #default>
        <p-card
          element="div"
          class="p-2 hover:shadow-md hover:border-subtle ease-in-out duration-200 min-w-[223px]"
          sectioned>
          <div class="flex items-center space-x-3">
            <div>
              Toggle Sidebar <IconCheck class="inline text-info" v-if="model" /> <IconClose class="inline text-danger" v-else />
              <p-caption>just works in under lg screen</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-checkbox>
  </div>
  <p-sidebar v-model="model" toggleable="lg" fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav title="Main">
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar v-model="model" toggleable="lg" fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav title="Main">
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

<p-banner variant="danger" :dismissable="false">
  <strong>Toggleable</strong> just work in sidebar fixed
</p-banner>

It's possible to make sidebar toggle-hide by default to make fullwidth page with no-sidebar. Just give `all` value in `toggleable` props.
<preview class="preview--fixed">
  <div class="flex justify-end">
    <p-checkbox appearance="none" v-model="modelA">
      <template #default>
        <p-card
          element="div"
          class="p-2 hover:shadow-md hover:border-subtle ease-in-out duration-200 min-w-[223px]"
          sectioned>
          <div class="flex items-center space-x-3">
            <div>
              Toggle Sidebar <IconCheck class="inline text-info" v-if="modelA" /> <IconClose class="inline text-danger" v-else />
              <p-caption>works in all screen</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-checkbox>
  </div>
  <p-sidebar v-model="modelA" toggleable="all" fixed type="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDocument />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconGroup />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDataStructured />
        </template>
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar v-model="model" toggleable="all" fixed type="narrow">
    <template #brand>
      <p-sidebar-brand>
        <img src="/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDocument />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconGroup />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDataStructured />
        </template>
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

## Variables
Sidebar use local CSS variables for enhanced real-time customization.

### `.sidebar`
```sass
--p-sidebar-size-narrow: 60px;
--p-sidebar-size-wide: 230px;
--p-sidebar-bg: theme(backgroundColor.DEFAULT);
--p-sidebar-bg-dark: theme(backgroundColor.dark.DEFAULT);
--p-sidebar-z-index: theme(zIndex.fixed);
--p-sidebar-sticky-top: theme(spacing.0);
```

### `.sidebar__brand`

```sass
--p-sidebar-brand-sticky-top: 0;
```

## API

### Props `<p-sidebar>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `variant`      | `String`  | `pills`     | Sidebar variant, valid value is `pills`, `lines` and `tabs`       |
| `align`        | `String`  | `left`      | Sidebar alignment, valid value is `left` and `right`              |
| `type`         | `String`  | `wide`      | Sidebar type, valid value is `wide` and `narrow`                  |
| `fixed`        | `Boolean` | `false`     | Activate fixed Sidebar                                            |
| `toggleable`   | `String`  | `-`         | Toggle with desired breakpoint `lg`, `md`, `sm` and `all`         |

### Slots `<p-sidebar>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Sidebar                         |
| `brand`          | Content to place in the Sidebar Brand                   |
| `bottom`         | Content to place in the Sidebar bottom                   |

### Props `<p-sidebar-brand>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `href`         | `String`  | `undefined` | Target URL of the Sidebar Brand link                              |
| `fixed`        | `Boolean` | `false`     | Make position of sidebar brand fixed on top                       |
| `sticky`       | `Boolean` | `false`     | Make position of sidebar brand sticky on top                      |

### Slots `<p-sidebar-brand>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Sidebar Brand                   |

### Props `<p-sidebar-nav>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `title`        | `String`  | `undefined` | Title to place in the top of sidebar navigation block             |
| `bottom`       | `Boolean` | `false`     | Place group of sidebar navigation in the bottom of Sidebar        |
| `condensed`    | `Boolean` | `false`     | Activate condensed of group navigation with less space            |

### Slots `<p-sidebar-nav>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Sidebar Nav                     |

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
