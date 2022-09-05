<script setup>
  import pSidebar from './Sidebar.vue'
  import pSidebarNav from './SidebarNav.vue'
  import pSidebarBrand from './SidebarBrand.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pNavSubItem from '../nav/NavSubItem.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconGroup from '@carbon/icons-vue/lib/group/20'
  import IconDataStructured from '@carbon/icons-vue/lib/data--structured/20'
  import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
</script>

<style scoped>
  .preview {
    @apply block h-96 overflow-hidden;

    .sidebar--fixed {
      @apply absolute;
    }
  }
</style>

# Sidebar

## Usage
### Basic Sidebar

<preview>
  <p-sidebar>
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
    <p-sidebar-nav>
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>
```

### Fixed Sidebar
<preview>
  <p-sidebar fixed>
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
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
<preview>
<p-sidebar fixed align="right">
  <p-sidebar-brand>
    <img src="./assets/images/logo-privy.svg" alt="" />
  </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
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

<preview>
<p-sidebar fixed>
  <p-sidebar-brand>
    <img src="./assets/images/logo-privy.svg" alt="" />
  </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
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
<preview>
  <p-sidebar fixed type="narrow">
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
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

<preview>
  <p-sidebar fixed type="narrow">
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
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

<preview>
  <p-sidebar fixed type="narrow">
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
    <p-sidebar-nav bottom>
      <p-nav-item>
        <template #icon>
          <IconSettings />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <img src="./assets/images/icon-flag.svg"/>
        </template>
        ENG
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</preview>

```vue
<template>
  <p-sidebar fixed type="narrow">
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
    <p-sidebar-nav bottom>
      <p-nav-item active>
        <template #icon>
          <IconSettings />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <img src="./assets/images/icon-flag.svg"/>
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

<preview>
<p-sidebar fixed>
  <p-sidebar-brand>
    <img src="./assets/images/logo-privy.svg" alt="" />
  </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
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

<preview>
<p-sidebar fixed>
  <p-sidebar-brand>
    <img src="./assets/images/logo-privy.svg" alt="" />
  </p-sidebar-brand>
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
    <p-sidebar-brand>
      <img src="./assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
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

## API

### Props `<p-sidebar>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `variant`      | `String`  | `pills`     | Sidebar variant, valid value is `pills`, `lines` and `tabs`       |
| `align`        | `String`  | `left`      | Sidebar alignment, valid value is `left` and `right`              |
| `type`         | `String`  | `wide`      | Sidebar type, valid value is `wide` and `narrow`                  |
| `fixed`        | `Boolean` | `false`     | Activate fixed Sidebar                                            |

### Slots `<p-sidebar>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Sidebar                         |

### Props `<p-sidebar-brand>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `href`         | `String`  | `undefined` | Target URL of the Sidebar Brand link                              |

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
