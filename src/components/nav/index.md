---
title: Nav · Components
description: Sub-components for Navbar, Sidebar, and Tabs.
---

<script setup>
import pNav from './Nav.vue'
import pNavItem from './NavItem.vue'
import pNavSubItem from './NavSubItem.vue'
import IconEdit from '@carbon/icons-vue/lib/edit/16'
import IconView from '@carbon/icons-vue/lib/view/16'
import IconDocument from '@carbon/icons-vue/lib/document/16'
import IconMenu from '@carbon/icons-vue/lib/overflow-menu--vertical/16'
import pBadge from '../badge/Badge.vue'
import pNavItemDropdown from './NavItemDropdown.vue'
import pDropdownItem from '../dropdown/DropdownItem.vue'
import pRadio from '../radio/Radio.vue'
import { ref } from 'vue-demi'

const options = ref(['english', 'indonesian'])
const lang = ref('english')
const isOpen = ref(false)
function close () {
  isOpen.value = false
}
</script>

<style lang="postcss" scoped>
  .preview {
    @apply block;
  }
</style>

# Nav

> Sub-components for [Navbar](/components/navbar/), [Sidebar](/components/sidebar/), and [Tabs](/components/tabs/).

## Usage

### Simple Navigation

<preview>
  <p-nav>
    <p-nav-item-dropdown icon no-caret v-model="isOpen">
      <template #button-content>
        <IconMenu />
      </template>
      <template v-for="(item, idx) in options" :key="idx">
        <p-radio
          appearance="option"
          v-model="lang"
          @click="close"
          :value="item">
          {{ item }}
        </p-radio>
      </template>
    </p-nav-item-dropdown>
  </p-nav>
  <p-nav>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Disabled</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Disabled</p-nav-item>
  </p-nav>
</template>
```

## Variants

Navigation has 3 variants, `pills`, `tabs` and `lines`. Default is `pills`

<preview>
  <p-nav variant="pills">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
  <p-nav variant="tabs">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
  <p-nav variant="lines">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav variant="pills">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
  <p-nav variant="tabs">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
  <p-nav variant="lines">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</template>
```

## Fill & Justify

Navigation can be fullwidth. There are 2 options available: `fill` and `justified`. To proportionately fill all available space, choose `fill`. When need every nav item will be the same width, choose `justified`.

<preview>
  <p-nav fill>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
  <p-nav justified variant="pills">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav fill>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
  <p-nav justified variant="pills">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</template>
```


## Alignment

To align Navigation, use `align` prop. Available value are `left`, `right` and `center`

<preview>
  <p-nav align="left">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Auditrail</p-nav-item>
  </p-nav>
  <p-nav align="center">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Auditrail</p-nav-item>
  </p-nav>
  <p-nav align="right">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Auditrail</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav align="left">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Auditrail</p-nav-item>
  </p-nav>
  <p-nav align="center">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Auditrail</p-nav-item>
  </p-nav>
  <p-nav align="right">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item disabled>Auditrail</p-nav-item>
  </p-nav>
</template>
```

## With Icon & Badge

### Icon
<preview>
  <p-nav>
    <p-nav-item active>
      <template #icon>
        <IconEdit />
      </template>
    </p-nav-item>
    <p-nav-item>
      <template #icon>
        <IconView />
      </template>
    </p-nav-item>
    <p-nav-item disabled>
      <template #icon>
        <IconDocument />
      </template>
    </p-nav-item>
  </p-nav>
  <p-nav fill>
    <p-nav-item active>
      <template #icon>
        <IconEdit />
      </template>
      To Sign
    </p-nav-item>
    <p-nav-item>
      <template #icon>
        <IconView />
      </template>
      To Review
    </p-nav-item>
    <p-nav-item disabled>
      <template #icon>
        <IconDocument />
      </template>
      Auditrail
    </p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav>
    <p-nav-item active>
      <template #icon>
        <IconEdit />
      </template>
    </p-nav-item>
    <p-nav-item>
      <template #icon>
        <IconView />
      </template>
    </p-nav-item>
    <p-nav-item disabled>
      <template #icon>
        <IconDocument />
      </template>
    </p-nav-item>
  </p-nav>
  <p-nav fill>
    <p-nav-item active>
      <template #icon>
        <IconEdit />
      </template>
      To Sign
    </p-nav-item>
    <p-nav-item>
      <template #icon>
        <IconView />
      </template>
      To Review
    </p-nav-item>
    <p-nav-item disabled>
      <template #icon>
        <IconDocument />
      </template>
      Auditrail
    </p-nav-item>
  </p-nav>
</template>
```

### Badge
<preview>
  <p-nav fill>
    <p-nav-item active>To Sign <p-badge variant="light">25</p-badge></p-nav-item>
    <p-nav-item>To Review <p-badge variant="light">25</p-badge></p-nav-item>
  </p-nav>
  <p-nav fill>
    <p-nav-item active>
      <template #icon>
        <IconView />
      </template>
      To Sign <p-badge variant="light">25</p-badge>
    </p-nav-item>
    <p-nav-item>
      <template #icon>
        <IconView />
      </template>
      To Review <p-badge variant="light">25</p-badge>
    </p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav fill>
    <p-nav-item active>
      To Sign
      <p-badge variant="light">25</p-badge>
    </p-nav-item>
    <p-nav-item>
      To Review
      <p-badge variant="light">25</p-badge>
    </p-nav-item>
  </p-nav>
  <p-nav fill>
    <p-nav-item active>
      <template #icon>
        <IconView />
      </template>
      To Sign <p-badge variant="light">25</p-badge>
    </p-nav-item>
    <p-nav-item>
      <template #icon>
        <IconView />
      </template>
      To Review <p-badge variant="light">25</p-badge>
    </p-nav-item>
  </p-nav>
</template>
```

## Dropdown

<preview>
  <p-nav>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item-dropdown icon no-caret>
      <template #button-content>
        <IconMenu />
      </template>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
    </p-nav-item-dropdown>
  </p-nav>
  <p-nav fill>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item-dropdown icon no-caret>
      <template #button-content>
        <IconMenu />
      </template>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
    </p-nav-item-dropdown>
  </p-nav>
</preview>

```vue
<template>
  <p-nav>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item-dropdown icon>
      <template #button-content>
        <IconMenu />
      </template>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
    </p-nav-item-dropdown>
  </p-nav>
  <p-nav fill>
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item-dropdown icon>
      <template #button-content>
        <IconMenu />
      </template>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
    </p-nav-item-dropdown>
  </p-nav>
</template>
```

## Vertical
Navigation by default appear on horizontal line. You can stack navigation by setting `vertical` prop.

<preview>
  <p-nav vertical class="w-80" variant="tabs">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav vertical class="w-80">
    <p-nav-item active>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</template>
```

## Submenu
Submenu just support in vertical navigation. If you need collapsible menus, you just add `collapsible` prop

### Default Submenu
<preview>
  <p-nav vertical class="w-64">
    <p-nav-item active>Home</p-nav-item>
    <p-nav-sub-item text="Documents">
      <p-nav>
        <p-nav-item>To Sign</p-nav-item>
        <p-nav-item>To Review</p-nav-item>
      </p-nav>
    </p-nav-sub-item>
    <p-nav-item>Contacts</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav vertical class="w-64">
    <p-nav-item active>Home</p-nav-item>
    <p-nav-sub-item text="Documents">
      <p-nav>
        <p-nav-item>To Sign</p-nav-item>
        <p-nav-item>To Review</p-nav-item>
      </p-nav>
    </p-nav-sub-item>
    <p-nav-item>Contacts</p-nav-item>
  </p-nav>
</template>
```
### Collapsible Submenu
<preview>
  <p-nav vertical class="w-64">
    <p-nav-item active>Home</p-nav-item>
    <p-nav-sub-item text="Documents" collapsible>
      <p-nav>
        <p-nav-item>To Sign</p-nav-item>
        <p-nav-item>To Review</p-nav-item>
      </p-nav>
    </p-nav-sub-item>
    <p-nav-item>Contacts</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav vertical class="w-64">
    <p-nav-item active>Home</p-nav-item>
    <p-nav-sub-item text="Documents" collapsible>
      <p-nav>
        <p-nav-item>To Sign</p-nav-item>
        <p-nav-item>To Review</p-nav-item>
      </p-nav>
    </p-nav-sub-item>
    <p-nav-item>Contacts</p-nav-item>
  </p-nav>
</template>
```

## Condensed Navigation
If you need less space/padding of navigation, you can set by using `condensed` prop.

<preview>
  <p-nav condensed>
    <p-nav-item active>Need Action</p-nav-item>
    <p-nav-item>In Progress</p-nav-item>
    <p-nav-item>Others</p-nav-item>
  </p-nav>
  <p-nav vertical condensed class="w-80">
    <p-nav-item>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav condensed>
    <p-nav-item active>Need Action</p-nav-item>
    <p-nav-item>In Progress</p-nav-item>
    <p-nav-item>Others</p-nav-item>
  </p-nav>
  <p-nav vertical condensed class="w-80">
    <p-nav-item>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</template>
```

## Title
When you need title for grouping navigation, you can add navigation title by using `title` prop.

<preview>
  <p-nav title="Document">
    <p-nav-item disabled>Need Action</p-nav-item>
    <p-nav-item>In Progress</p-nav-item>
    <p-nav-item>Others</p-nav-item>
  </p-nav>
  <p-nav vertical title="Quick Jump" class="w-80">
    <p-nav-item>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</preview>

```vue
<template>
  <p-nav title="Document">
    <p-nav-item disabled>Need Action</p-nav-item>
    <p-nav-item>In Progress</p-nav-item>
    <p-nav-item>Others</p-nav-item>
  </p-nav>
  <p-nav vertical title="Quick Jump" class="w-80">
    <p-nav-item>To Sign</p-nav-item>
    <p-nav-item>To Review</p-nav-item>
    <p-nav-item>Auditrail</p-nav-item>
  </p-nav>
</template>
```

## API

### Props `<p-nav>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `variant`      | `String`  | `pills`     | Navigation variant, valid value is `pills`, `lines` and `tabs`    |
| `fill`         | `Boolean` | `false`     | Activate fullwidth navigation with `fill` type                    |
| `justified`    | `Boolean` | `false`     | Activate fullwidth navigation with `justified` type               |
| `align`        | `String`  | `left`      | Navigation alignment, valid value is `left`, `center`, and `right`|
| `vertical`     | `Boolean` | `false`     | Activate vertical navigation                                      |
| `title`        | `String`  | `undefined` | Title to place in the top of navigation block                     |
| `condensed`    | `Boolean` | `false`     | Activate condensed navigation with less space                     |

### Slots `<p-nav>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Nav                             |

### Props `<p-nav-item>`

| Props          |   Type     | Default      | Description                                  |
|----------------|:----------:|:------------:|-------------------------------------------------------------------|
| `active`       | `Boolean`  | `false`      | Place component in the active state with active styling           |
| `disabled`     | `Boolean`  | `false`      | Disables component functionality and place it in disabled state   |
| `href`         | `String`   | `undefined`  | Target URL of the link                                            |
| `target`       | `String`   | `_self`      | Sets the `target` attribute on the rendered link, valid value is `_blank`, `_self`, `_parent`, dan `_top` |

### Slots `<p-nav-item>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the nav item                        |
| `icon`           | Content to place icon in nav item                       |

### Props `<p-nav-form>`

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th style="text-align:center;">Type</th>
      <th style="text-align:center;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

### Slots `<p-nav-form>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place form input in the navigation             |

### Props `<p-nav-text>`

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th style="text-align:center;">Type</th>
      <th style="text-align:center;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

### Slots `<p-nav-text>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place text or image in the navigation        |

### Props `<p-nav-sub-item>`

| Props          |   Type     | Default      | Description                                  |
|----------------|:----------:|:------------:|-------------------------------------------------------------------|
| `text`         | `String`   | `undefined`  | Place text in the submenu parent                                  |
| `collapsible`  | `Boolean`  | `false`      | Enable collapsible Submenu                                        |

### Slots `<p-nav-sub-item>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the submenu item                        |

### Props `<p-nav-item-dropdown>`

| Props          |   Type     | Default      | Description                                  |
|----------------|:----------:|:------------:|-------------------------------------------------------------------|
| `text`         | `String`   | `undefined`  | Text to place in the toggle element (link) of dropdown            |
| `menu-class`         | `String` or `Array` or `Object`   | `undefined`  | CSS class to add in the menu container            |

### Slots `<p-nav-item-dropdown>`

| Name              | Description                                             |
|-------------------|---------------------------------------------------------|
| `default`         | Content to place in the nav item dropdown               |
| `button-content`  | Can be used to place custom text, icon or more styling  |


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
