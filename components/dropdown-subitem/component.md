<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
  import Badge from '../badge/Badge.vue'
  import Input from "../input/Input.vue"
  import Dropdown from "../dropdown/Dropdown.vue"
  import DropdownItem from "../dropdown/DropdownItem.vue"
  import DropdownSubitem from "./DropdownSubitem.vue"
  import Banner from '../banner/Banner.vue'
  import Checkbox from '../checkbox/Checkbox.vue'
  import { ref } from "vue-demi"

  const show = ref(false)
</script>

# Dropdown Subitem

## Usage

### Simple Usage

<preview>
  <Dropdown text="Fruit">
    <DropdownSubitem text="Fruit A">
      <DropdownItem>Apple</DropdownItem>
      <DropdownItem>Avocado</DropdownItem>
    </DropdownSubitem>
    <DropdownSubitem text="Fruit B">
      <DropdownItem>Banana</DropdownItem>
      <DropdownItem>Blueberry</DropdownItem>
    </DropdownSubitem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Fruit">
    <DropdownSubitem text="Fruit A">
      <DropdownItem>Apple</DropdownItem>
      <DropdownItem>Avocado</DropdownItem>
    </DropdownSubitem>
    <DropdownSubitem text="Fruit B">
      <DropdownItem>Banana</DropdownItem>
      <DropdownItem>Blueberry</DropdownItem>
    </DropdownSubitem>
  </Dropdown>
</template>
```

### Multi Level Subitem

<preview>
  <Dropdown text="Multi Level">
    <DropdownSubitem text="Level A" backText="Kembali">
      <DropdownItem>Item A-1</DropdownItem>
      <DropdownItem>Item A-2</DropdownItem>
      <DropdownSubitem text="Level AA">
        <DropdownItem>Item AA-1</DropdownItem>
        <DropdownItem>Item AA-2</DropdownItem>
      </DropdownSubitem>
    </DropdownSubitem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Multi Level">
    <DropdownSubitem text="Level A">
      <DropdownItem>Item A-1</DropdownItem>
      <DropdownItem>Item A-2</DropdownItem>
      <DropdownSubitem text="Level AA">
        <DropdownItem>Item AA-1</DropdownItem>
        <DropdownItem>Item AA-2</DropdownItem>
      </DropdownSubitem>
    </DropdownSubitem>
  </Dropdown>
</template>
```

## Custom Button Content

Similar to [Dropdown](/dropdown/component), You can change button content via slot `button-content`

<preview>
  <Dropdown text="Custom Content">
    <DropdownSubitem>
      <template #button-content>
        <IconBee class="inline-block" /> Fruit A
      </template>
      <DropdownItem>Apple</DropdownItem>
      <DropdownItem>Avocado</DropdownItem>
    </DropdownSubitem>
    <DropdownSubitem text="Fruit B">
      <DropdownItem>Banana</DropdownItem>
      <DropdownItem>Blueberry</DropdownItem>
    </DropdownSubitem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Custom Content">
    <DropdownSubitem>
      <template #button-content>
        <IconBee class="inline-block" /> Fruit A
      </template>
      <DropdownItem>Apple</DropdownItem>
      <DropdownItem>Avocado</DropdownItem>
    </DropdownSubitem>
    <DropdownSubitem text="Fruit B">
      <DropdownItem>Banana</DropdownItem>
      <DropdownItem>Blueberry</DropdownItem>
    </DropdownSubitem>
  </Dropdown>
</template>
```

## API

### Props

| Props  |   Type   | Default | Description  |
|--------|:--------:|:-------:|--------------|
| `text` | `String` |   `-`   | Text content |

### Slots

| Name      | Description                |
|-----------|----------------------------|
| `default` | Content to place in button |

### Events

| Name    | Arguments               | Description                  |
|---------|-------------------------|------------------------------|
| `click` | Native DOM Event object | Event when button is clicked |

## See Also

- [Dropdown](/dropdown/component)
