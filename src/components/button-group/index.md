---
title: Button Group · Components
description: Collection of buttons consisting of at least 2 buttons in single line
---

<script setup>
  import { ref } from "vue-demi"
  import pButtonGroup from './ButtonGroup.vue'
  import pButton from '../button/Button.vue'
  import pDropdown from '../dropdown/Dropdown.vue'
  import pDropdownItem from '../dropdown/DropdownItem.vue'
  import IconChevronLeft from '@carbon/icons-vue/lib/chevron--left/20'
  import IconChevronRight from '@carbon/icons-vue/lib/chevron--right/20'
  import IconChevronDown from '@carbon/icons-vue/lib/chevron--down/20'

</script>

# Button Group

> Collection of buttons consisting of at least 2 buttons in single line

Button Group is a collection of buttons consisting of at least 2 buttons in single line.
Therefore, the Button Group is very dependent on the [Button][button] component. But it should be underlined that not all props on the Button can work here.

## Usage

### Simple Button

<preview class="flex-col items-center">
  <p-button-group>
    <p-button>Button Text</p-button>
    <p-button>Button Text</p-button>
  </p-button-group>
</preview>

```vue
<template>
  <p-button-group>
    <p-button>Button Text</p-button>
    <p-button>Button Text</p-button>
  </p-button-group>
</template>
```
### Button with Addon

Place one add-on on either side of a Button. You may also make Button all addon.

#### Addon Left

<preview class="flex-col space-y-2">
  <p-button-group>
    <p-button icon color="info"><IconChevronLeft /></p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
</preview>

```vue
<template>
  <p-button-group>
    <p-button icon color="info"><IconChevronLeft /></p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
</template>

<script setup>
  import IconChevronLeft from '@carbon/icons-vue/lib/chevron--left/20'
</script>
```

#### Addon Right
In the button group, to simplify several actions in one button, it can be combined with the [Dropdown][dropdown] component.

<preview>
  <p-button-group>
    <p-button color="info">Button Text</p-button>
    <p-dropdown
      color="info"
      no-caret
      icon>
      <template #button-content>
        <IconChevronDown />
      </template>
      <p-dropdown-item>Action</p-dropdown-item>
      <p-dropdown-item>Another action</p-dropdown-item>
      <p-dropdown-item>Something else here</p-dropdown-item>
    </p-dropdown>
  </p-button-group>
</preview>

```vue
<template>
  <p-button-group>
    <p-button color="info">Button Text</p-button>
    <p-dropdown
      color="info"
      no-caret
      icon>
      <template #button-content>
        <IconChevronDown />
      </template>
      <p-dropdown-item>Action</p-dropdown-item>
      <p-dropdown-item>Another action</p-dropdown-item>
      <p-dropdown-item>Something else here</p-dropdown-item>
    </p-dropdown>
  </p-button-group>
</template>

<script setup>
  import IconChevronDown from '@carbon/icons-vue/lib/chevron--down/20'
</script>
```

#### All Addon
Button Group all addon is group a series of buttons with only icon

<preview>
  <p-button-group>
    <p-button color="info" icon><IconChevronLeft /></p-button>
    <p-button color="info" icon><IconChevronRight /></p-button>
  </p-button-group>
</preview>

```vue
<template>
  <p-button-group>
    <p-button icon><IconChevronLeft /></p-button>
    <p-button icon><IconChevronRight /></p-button>
  </p-button-group>
</template>

<script setup>
  import IconChevronLeft from '@carbon/icons-vue/lib/chevron--left/20'
  import IconChevronRight from '@carbon/icons-vue/lib/chevron--right/20'
</script>
```

## Variants

Button Group just available in 2 variants: `solid` and `outline`. You can make these variants by applying variant to each button in a group.

<preview class="flex-col items-center space-y-3">
  <div>
    <p-button-group>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group>
      <p-button color="info" variant="outline">Button Text</p-button>
      <p-button color="info" variant="outline">Button Text</p-button>
      <p-button color="info" variant="outline">Button Text</p-button>
    </p-button-group>
  </div>
</preview>

```vue
<template>
  <p-button-group>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
  <p-button-group>
    <p-button color="info" variant="outline">Button Text</p-button>
    <p-button color="info" variant="outline">Button Text</p-button>
    <p-button color="info" variant="outline">Button Text</p-button>
  </p-button-group>
</template>
```

## Color
You can change color of Button Group by applying color to every Button in a group.
<preview class="flex-col items-center space-y-3">
  <div>
    <p-button-group>
      <p-button color="primary">Button Text</p-button>
      <p-button color="primary">Button Text</p-button>
      <p-button color="primary">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group>
      <p-button color="success">Button Text</p-button>
      <p-button color="success">Button Text</p-button>
      <p-button color="success">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group>
      <p-button color="warning">Button Text</p-button>
      <p-button color="warning">Button Text</p-button>
      <p-button color="warning">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group>
      <p-button color="danger">Button Text</p-button>
      <p-button color="danger">Button Text</p-button>
      <p-button color="danger">Button Text</p-button>
    </p-button-group>
  </div>
</preview>

```vue
<template>
  <p-button-group>
    <p-button color="primary">Button Text</p-button>
    <p-button color="primary">Button Text</p-button>
    <p-button color="primary">Button Text</p-button>
  </p-button-group>
  <p-button-group>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
  <p-button-group>
    <p-button color="success">Button Text</p-button>
    <p-button color="success">Button Text</p-button>
    <p-button color="success">Button Text</p-button>
  </p-button-group>
  <p-button-group>
    <p-button color="warning">Button Text</p-button>
    <p-button color="warning">Button Text</p-button>
    <p-button color="warning">Button Text</p-button>
  </p-button-group>
  <p-button-group>
    <p-button color="danger">Button Text</p-button>
    <p-button color="danger">Button Text</p-button>
    <p-button color="danger">Button Text</p-button>
  </p-button-group>
</template>
```

## Sizing

Instead of applying button sizing prop to every button in a group, you just can add size in Button Group. There are 4 sizes available: `xs`, `sm`, `md` and `lg`. Default is `md`

<preview class="flex-col items-center space-y-3">
  <div>
    <p-button-group size="xs">
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group size="sm">
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group size="md">
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group size="lg">
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
</preview>

```vue
<template>
  <p-button-group size="xs">
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
  <p-button-group size="sm">
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
  <p-button-group size="md">
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
  <p-button-group size="lg">
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
  </p-button-group>
</template>
```
## Pill mode

You just add `pill` in Button Group to make button more rounded. Prop `pill` of every single Button will not working in Button Group

<preview class="flex-col items-center space-y-3">
  <div>
    <p-button-group pill>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group pill>
      <p-button color="info" variant="outline">Button Text</p-button>
      <p-button color="info" variant="outline">Button Text</p-button>
      <p-button color="info" variant="outline">Button Text</p-button>
    </p-button-group>
  </div>
</preview>

```vue
<template>
  <div>
    <p-button-group pill>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
      <p-button color="info">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
    <p-button-group pill>
      <p-button color="info" variant="outline">Button Text</p-button>
      <p-button color="info" variant="outline">Button Text</p-button>
      <p-button color="info" variant="outline">Button Text</p-button>
    </p-button-group>
  </div>
  <div>
</template>
```

## API

### Props

| Props      |   Type    |  Default  | Description                                                         |
|------------|:---------:|:---------:|---------------------------------------------------------------------|
| `size`     | `String`  |   `md`    | Size of button group, valid value is `xs`, `sm`, `md` and `lg`      |
| `pill`     | `Boolean` |  `false`  | Enable pill mode                                                    |

### Slots

| Name      | Description                                               |
|-----------|-----------------------------------------------------------|
| `default` | Content (in the form of— button) to place in button group |

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

## See Also
- [Button][button]
- [Dropdown][dropdown]

[button]: /components/button/index
[dropdown]: /components/dropdown/index
