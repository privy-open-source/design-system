---
title: Dropdown Subitem · Components
description: Sub-component of Dropdown for nesting dropdown item.
---

<script setup>
  import Persona from '@privyid/persona-icon/vue/persona/20.vue'
  import Badge from '../badge/Badge.vue'
  import Input from "../input/Input.vue"
  import pDropdown from "../dropdown/Dropdown.vue"
  import pDropdownItem from "../dropdown/DropdownItem.vue"
  import pDropdownSubitem from "./DropdownSubitem.vue"
  import Banner from '../banner/Banner.vue'
  import Checkbox from '../checkbox/Checkbox.vue'
  import { ref } from "vue-demi"

  const show = ref(false)
</script>

# Dropdown Subitem

> Sub-component of [Dropdown](/components/dropdown/) for nesting dropdown item.

## Usage

### Simple Usage

<preview>
  <p-dropdown text="Fruit">
    <p-dropdown-subitem text="Fruit A">
      <p-dropdown-item>Apple</p-dropdown-item>
      <p-dropdown-item>Avocado</p-dropdown-item>
    </p-dropdown-subitem>
    <p-dropdown-subitem text="Fruit B">
      <p-dropdown-item>Banana</p-dropdown-item>
      <p-dropdown-item>Blueberry</p-dropdown-item>
    </p-dropdown-subitem>
  </p-dropdown>
</preview>

```vue
<template>
  <p-dropdown text="Fruit">
    <p-dropdown-subitem text="Fruit A">
      <p-dropdown-item>Apple</p-dropdown-item>
      <p-dropdown-item>Avocado</p-dropdown-item>
    </p-dropdown-subitem>
    <p-dropdown-subitem text="Fruit B">
      <p-dropdown-item>Banana</p-dropdown-item>
      <p-dropdown-item>Blueberry</p-dropdown-item>
    </p-dropdown-subitem>
  </p-dropdown>
</template>
```

### Multi Level Subitem

<preview>
  <p-dropdown text="Multi Level">
    <p-dropdown-subitem text="Level A" backText="Kembali">
      <p-dropdown-item>Item A-1</p-dropdown-item>
      <p-dropdown-item>Item A-2</p-dropdown-item>
      <p-dropdown-subitem text="Level AA">
        <p-dropdown-item>Item AA-1</p-dropdown-item>
        <p-dropdown-item>Item AA-2</p-dropdown-item>
      </p-dropdown-subitem>
    </p-dropdown-subitem>
  </p-dropdown>
</preview>

```vue
<template>
  <p-dropdown text="Multi Level">
    <p-dropdown-subitem text="Level A">
      <p-dropdown-item>Item A-1</p-dropdown-item>
      <p-dropdown-item>Item A-2</p-dropdown-item>
      <p-dropdown-subitem text="Level AA">
        <p-dropdown-item>Item AA-1</p-dropdown-item>
        <p-dropdown-item>Item AA-2</p-dropdown-item>
      </p-dropdown-subitem>
    </p-dropdown-subitem>
  </p-dropdown>
</template>
```

## Custom Button Content

Similar to [Dropdown][dropdown], You can change button content via slot `button-content`

<preview>
  <p-dropdown text="Custom Content">
    <p-dropdown-subitem>
      <template #button-content>
        <Persona class="inline-block" /> Fruit A
      </template>
      <p-dropdown-item>Apple</p-dropdown-item>
      <p-dropdown-item>Avocado</p-dropdown-item>
    </p-dropdown-subitem>
    <p-dropdown-subitem text="Fruit B">
      <p-dropdown-item>Banana</p-dropdown-item>
      <p-dropdown-item>Blueberry</p-dropdown-item>
    </p-dropdown-subitem>
  </p-dropdown>
</preview>

```vue
<template>
  <p-dropdown text="Custom Content">
    <p-dropdown-subitem>
      <template #button-content>
        <Persona class="inline-block" /> Fruit A
      </template>
      <p-dropdown-item>Apple</p-dropdown-item>
      <p-dropdown-item>Avocado</p-dropdown-item>
    </p-dropdown-subitem>
    <p-dropdown-subitem text="Fruit B">
      <p-dropdown-item>Banana</p-dropdown-item>
      <p-dropdown-item>Blueberry</p-dropdown-item>
    </p-dropdown-subitem>
  </p-dropdown>
</template>
```

## Hide Caret

Similar with [Dropdown][dropdown], you can hide caret icon with `no-caret` props.

<preview>
  <p-dropdown text="Fruit">
    <p-dropdown-subitem text="with Caret">
      <p-dropdown-item>Apple</p-dropdown-item>
      <p-dropdown-item>Avocado</p-dropdown-item>
    </p-dropdown-subitem>
    <p-dropdown-subitem text="without Caret" no-caret>
      <p-dropdown-item>Banana</p-dropdown-item>
      <p-dropdown-item>Blueberry</p-dropdown-item>
    </p-dropdown-subitem>
  </p-dropdown>
</preview>

```vue
<template>
  <p-dropdown text="Fruit">
    <p-dropdown-subitem text="with Caret">
      <p-dropdown-item>Apple</p-dropdown-item>
      <p-dropdown-item>Avocado</p-dropdown-item>
    </p-dropdown-subitem>
    <p-dropdown-subitem text="without Caret" no-caret>
      <p-dropdown-item>Banana</p-dropdown-item>
      <p-dropdown-item>Blueberry</p-dropdown-item>
    </p-dropdown-subitem>
  </p-dropdown>
</template>
```

## API

### Props

| Props      |   Type    | Default | Description     |
|------------|:---------:|:-------:|-----------------|
| `text`     | `String`  |   `-`   | Text content    |
| `no-caret` | `Boolean` | `false` | Hide caret icon |

### Slots

| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in button |

### Events

| Name    | Arguments               | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |

## See Also

- [Dropdown][dropdown]

[dropdown]: /components/dropdown/index
