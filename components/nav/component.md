<script setup>
import Nav from './Nav.vue'
import NavItem from './NavItem.vue'
import NavSubItem from './NavSubItem.vue'
import NavText from './NavText.vue'
import IconEdit from '@carbon/icons-vue/lib/edit/16'
import IconView from '@carbon/icons-vue/lib/view/16'
import IconDocument from '@carbon/icons-vue/lib/document/16'
import IconMenu from '@carbon/icons-vue/lib/overflow-menu--vertical/16'
import Badge from '../badge/Badge.vue'
import NavItemDropdown from './NavItemDropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
</script>

<style scoped>
  .preview {
    @apply block;
  }
</style>

# Navigations

## Usage

### Simple Navigation

<preview>
  <Nav>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Disabled</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Disabled</NavItem>
  </Nav>
</template>
```

## Variants

Navigation has 3 variants, `pills`, `tabs` and `lines`. Default is `pills`

<preview>
  <Nav variant="pills">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
  <Nav variant="tabs">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
  <Nav variant="lines">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav variant="pills">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
  <Nav variant="tabs">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
  <Nav variant="lines">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</template>
```

## Fill & Justify

Navigation can be fullwidth. There are 2 options available: `fill` and `justified`. To proportionately fill all available space, choose `fill`. When need every nav item will be the same width, choose `justified`.

<preview>
  <Nav fill>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
  <Nav justified variant="pills">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav fill>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
  <Nav justified variant="pills">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</template>
```


## Alignment

To align Navigation, use `align` prop. Available value are `left`, `right` and `center`

<preview>
  <Nav align="left">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Auditrail</NavItem>
  </Nav>
  <Nav align="center">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Auditrail</NavItem>
  </Nav>
  <Nav align="right">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Auditrail</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav align="left">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Auditrail</NavItem>
  </Nav>
  <Nav align="center">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Auditrail</NavItem>
  </Nav>
  <Nav align="right">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem disabled>Auditrail</NavItem>
  </Nav>
</template>
```

## With Icon & Badge

### Icon
<preview>
  <Nav>
    <NavItem active>
      <template #icon>
        <IconEdit />
      </template>
    </NavItem>
    <NavItem>
      <template #icon>
        <IconView />
      </template>
    </NavItem>
    <NavItem disabled>
      <template #icon>
        <IconDocument />
      </template>
    </NavItem>
  </Nav>
  <Nav fill>
    <NavItem active>
      <template #icon>
        <IconEdit />
      </template>
      To Sign
    </NavItem>
    <NavItem>
      <template #icon>
        <IconView />
      </template>
      To Review
    </NavItem>
    <NavItem disabled>  
      <template #icon>
        <IconDocument />
      </template>
      Auditrail
    </NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav>
    <NavItem active>
      <template #icon>
        <IconEdit />
      </template>
    </NavItem>
    <NavItem>
      <template #icon>
        <IconView />
      </template>
    </NavItem>
    <NavItem disabled>
      <template #icon>
        <IconDocument />
      </template>
    </NavItem>
  </Nav>
  <Nav fill>
    <NavItem active>
      <template #icon>
        <IconEdit />
      </template>
      To Sign
    </NavItem>
    <NavItem>
      <template #icon>
        <IconView />
      </template>
      To Review
    </NavItem>
    <NavItem disabled>  
      <template #icon>
        <IconDocument />
      </template>
      Auditrail
    </NavItem>
  </Nav>
</template>
```

### Badge
<preview>
  <Nav fill>
    <NavItem active>To Sign <Badge color="secondary" variant="light">25</Badge></NavItem>
    <NavItem>To Review <Badge color="secondary" variant="light">25</Badge></NavItem>
  </Nav>
  <Nav fill>
    <NavItem active>
      <template #icon>
        <IconView />
      </template>
      To Sign <Badge color="secondary" variant="light">25</Badge>
    </NavItem>
    <NavItem>
      <template #icon>
        <IconView />
      </template>
      To Review <Badge color="secondary" variant="light">25</Badge>
    </NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav fill>
    <NavItem active>
      To Sign 
      <Badge color="secondary" variant="light">25</Badge>
    </NavItem>
    <NavItem>
      To Review 
      <Badge color="secondary" variant="light">25</Badge>
    </NavItem>
  </Nav>
  <Nav fill>
    <NavItem active>
      <template #icon>
        <IconView />
      </template>
      To Sign <Badge color="secondary" variant="light">25</Badge>
    </NavItem>
    <NavItem>
      <template #icon>
        <IconView />
      </template>
      To Review <Badge color="secondary" variant="light">25</Badge>
    </NavItem>
  </Nav>
</template>
```

## Dropdown

<preview>
  <Nav>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItemDropdown icon>
      <template #button-content>
        <IconMenu />
      </template>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
    </NavItemDropdown>
  </Nav>
  <Nav fill>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItemDropdown icon>
      <template #button-content>
        <IconMenu />
      </template>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
    </NavItemDropdown>
  </Nav>
</preview>

```vue
<template>
  <Nav>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItemDropdown icon>
      <template #button-content>
        <IconMenu />
      </template>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
    </NavItemDropdown>
  </Nav>
  <Nav fill>
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItemDropdown icon>
      <template #button-content>
        <IconMenu />
      </template>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
      <DropdownItem>Item Text</DropdownItem>
    </NavItemDropdown>
  </Nav>
</template>
```

## Vertical
Navigation by default appear on horizontal line. You can stack navigation by setting `vertical` prop.

<preview>
  <Nav vertical class="w-80">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav vertical class="w-80">
    <NavItem active>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</template>
```

## Submenu
Submenu just support in vertical navigation. If you need collapsible menus, you just add `collapsible` prop 

### Default Submenu
<preview>
  <Nav vertical class="w-64">
    <NavItem active>Home</NavItem>
    <NavSubItem text="Documents">
      <Nav>
        <NavItem>To Sign</NavItem>
        <NavItem>To Review</NavItem>
      </Nav>
    </NavSubItem>
    <NavItem>Contacts</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav vertical class="w-64">
    <NavItem active>Home</NavItem>
    <NavSubItem text="Documents">
      <Nav>
        <NavItem>To Sign</NavItem>
        <NavItem>To Review</NavItem>
      </Nav>
    </NavSubItem>
    <NavItem>Contacts</NavItem>
  </Nav>
</template>
```
### Collapsible Submenu
<preview>
  <Nav vertical class="w-64">
    <NavItem active>Home</NavItem>
    <NavSubItem text="Documents" collapsible>
      <Nav>
        <NavItem>To Sign</NavItem>
        <NavItem>To Review</NavItem>
      </Nav>
    </NavSubItem>
    <NavItem>Contacts</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav vertical class="w-64">
    <NavItem active>Home</NavItem>
    <NavSubItem text="Documents" collapsible>
      <Nav>
        <NavItem>To Sign</NavItem>
        <NavItem>To Review</NavItem>
      </Nav>
    </NavSubItem>
    <NavItem>Contacts</NavItem>
  </Nav>
</template>
```

## Condensed Navigation
If you need less space/padding of navigation, you can set by using `condensed` prop.

<preview>
  <Nav condensed>
    <NavItem active>Need Action</NavItem>
    <NavItem>In Progress</NavItem>
    <NavItem>Others</NavItem>
  </Nav>
  <Nav vertical condensed class="w-80">
    <NavItem>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav condensed>
    <NavItem active>Need Action</NavItem>
    <NavItem>In Progress</NavItem>
    <NavItem>Others</NavItem>
  </Nav>
  <Nav vertical condensed class="w-80">
    <NavItem>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</template>
```

## Title
When you need title for grouping navigation, you can add navigation title by using `title` prop.

<preview>
  <Nav title="Document">
    <NavItem disabled>Need Action</NavItem>
    <NavItem>In Progress</NavItem>
    <NavItem>Others</NavItem>
  </Nav>
  <Nav vertical title="Quick Jump" class="w-80">
    <NavItem>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</preview>

```vue
<template>
  <Nav title="Document">
    <NavItem disabled>Need Action</NavItem>
    <NavItem>In Progress</NavItem>
    <NavItem>Others</NavItem>
  </Nav>
  <Nav vertical title="Quick Jump" class="w-80">
    <NavItem>To Sign</NavItem>
    <NavItem>To Review</NavItem>
    <NavItem>Auditrail</NavItem>
  </Nav>
</template>
```

## API

### Props `<Nav>`

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `variant`      | `String`  | `pills`     | Navigation variant, valid value is `pills`, `lines` and `tabs`    |
| `fill`         | `Boolean` | `false`     | Activate fullwidth navigation with `fill` type                    |
| `justified`    | `Boolean` | `false`     | Activate fullwidth navigation with `justified` type               |
| `align`        | `String`  | `left`      | Navigation alignment, valid value is `left`, `center`, and `right`|
| `vertical`     | `Boolean` | `false`     | Activate vertical navigation                                      |
| `title`        | `String`  | `undefined` | Title to place in the top of navigation block                     |
| `condensed`    | `Boolean` | `false`     | Activate condensed navigation with less space                     |

### Slots `<Nav>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Nav                             |

### Props `<NavItem>`

| Props          |   Type     | Default      | Description                                  |
|----------------|:----------:|:------------:|-------------------------------------------------------------------|
| `active`       | `Boolean`  | `false`      | Place component in the active state with active styling           |
| `disabled`     | `Boolean`  | `false`      | Disables component functionality and place it in disabled state   |
| `href`         | `String`   | `undefined`  | Target URL of the link                                            |
| `target`       | `String`   | `_self`      | Sets the `target` attribute on the rendered link, valid value is `_blank`, `_self`, `_parent`, dan `_top` |

### Slots `<NavItem>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the nav item                        |
| `icon`           | Content to place icon in nav item                       |

### Props `<NavSubItem>`

| Props          |   Type     | Default      | Description                                  |
|----------------|:----------:|:------------:|-------------------------------------------------------------------|
| `text`         | `String`   | `undefined`  | Place text in the submenu parent                                  |
| `collapsible`  | `Boolean`  | `false`      | Enable collapsible Submenu                                        |

### Slots `<NavSubItem>`

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the submenu item                        |

### Props `<NavItemDropdown>`

| Props          |   Type     | Default      | Description                                  |
|----------------|:----------:|:------------:|-------------------------------------------------------------------|
| `text`         | `String`   | `undefined`  | Text to place in the toggle element (link) of dropdown            |

### Slots `<NavItemDropdown>`

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
