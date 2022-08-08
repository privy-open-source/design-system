<script setup>
import Nav from './Nav.vue'
import NavItem from './NavItem.vue'
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

Navigation has 3 variants, `pills`, `tabs` and `lines`. Default is `tabs`

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

<preview class="block">
<Nav fill variant="tabs">
  <NavItem active>To Sign</NavItem>
  <NavItem>To Review</NavItem>
  <NavItem disabled>Auditrail</NavItem>
</Nav>
<Nav justified variant="pills">
  <NavItem active>To Sign</NavItem>
  <NavItem>To Review</NavItem>
  <NavItem disabled>Auditrail</NavItem>
</Nav>
<Nav fill variant="lines">
  <NavItem active>To Sign</NavItem>
  <NavItem>To Review</NavItem>
  <NavText>Auditrail</NavText>
  <NavItemDropdown icon>
    <template #button-content>
      <IconMenu />
    </template>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </NavItemDropdown>
</Nav>
<Nav variant="lines">
  <NavItem active>To Sign</NavItem>
  <NavItem>To Review</NavItem>
  <NavItemDropdown>
    <template #button-content>
      <IconMenu />
    </template>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </NavItemDropdown>
  <NavItemDropdown text="as">
    <template #button-content>
      <IconMenu />
    </template>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </NavItemDropdown>
</Nav>
<Nav vertical variant="tabs" class="w-80">
  <NavItem active>To Sign</NavItem>
  <NavItem>To Review</NavItem>
  <NavItem disabled>Auditrail</NavItem>
</Nav>
<Nav vertical variant="lines" class="w-80">
  <NavItem active>To Sign</NavItem>
  <NavItem>To Review</NavItem>
  <NavItem disabled>Auditrail</NavItem>
</Nav>
<Nav vertical variant="pills" class="w-80">
  <NavItem active>To Sign</NavItem>
  <NavItem>To Review</NavItem>
  <NavItem disabled>Auditrail</NavItem>
</Nav>
</preview>
