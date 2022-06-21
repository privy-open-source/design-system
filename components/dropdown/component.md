<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
  import Dropdown from "./Dropdown.vue"
  import DropdownItem from "./DropdownItem.vue"
  import DropdownGroup from "../dropdown-group/DropdownGroup.vue"
  import Banner from '../banner/Banner.vue'
  import Checkbox from '../checkbox/Checkbox.vue'
  import { ref } from "vue-demi"

  const show = ref(false)
</script>

# Dropdown

## Usage

### Simple Usage
<preview>
  <Dropdown text="Click Here">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Click Here">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>
```

### With Subtext
<preview>
  <Dropdown text="Click Here">
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Click Here">
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
    <DropdownItem>
      <div>Item Text</div>
      <div class="text-xs text-subtext-100">
        Item Subtext
      </div>
    </DropdownItem>
  </Dropdown>
</template>
```

## Placement

You can change popup placement via `placement` prop. Valid options is:

- `auto`
- `top`
- `bottom`
- `right`
- `left`

<preview class="flex-col gap-3 md:flex-row">
  <Dropdown text="Auto" placement="auto">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Top" placement="top">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Bottom" placement="bottom">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Right" placement="right">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Left" placement="left">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Auto" placement="auto">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Top" placement="top">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Bottom" placement="bottom">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Right" placement="right">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Left" placement="left">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>
```

### Placement Align

You can combine placement with suffix `*-start` and `*-end` to set popup position align

<Banner class="md:!hidden" :dismissable="false">Because limited screen width, maybe you can notice the different.</Banner>

<preview class="flex-col gap-3 md:flex-row">
  <Dropdown text="Bottom" placement="bottom">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Bottom Start" placement="bottom-start">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Bottom End" placement="bottom-end">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown text="Bottom" placement="bottom">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Bottom Start" placement="bottom-start">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
  <Dropdown text="Bottom End" placement="bottom-end">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>
```

## Button Customization

Every props in [Button](/button/component) like `variant`, `color`, `size`, `pill` and `icon`  also works in here.

<preview>
  <Dropdown
    text="Button"
    variant="outline"
    color="secondary"
    size="lg"
    pill
    icon>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown
    text="Button"
    variant="outline"
    color="secondary"
    size="lg"
    pill>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>
```

### Custom Button Content

You also can customize button content via slot `button-content`

<preview>
  <Dropdown
    text="Button"
    icon>
    <template #button-content>
      <IconBee />
    </template>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown
    icon>
    <template #button-content>
      <IconBee />
    </template>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>

<script setup>
  import IconBee from '@carbon/icons-vue/lib/bee/20'
</script>
```

## Disabled State

<preview>
  <Dropdown
    text="Button"
    disabled>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Dropdown
    text="Button"
    disabled>
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>
```

## Binding v-model

You can programmatically toggle dropdown using `v-model`

<preview class="flex-col gap-2">
  <Checkbox v-model="show">Show Dropdown</Checkbox>
  <Dropdown
    v-model="show"
    text="Button">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</preview>

```vue
<template>
  <Checkbox v-model="show">Show Dropdown</Checkbox>
  <Dropdown
    v-model="show"
    text="Button">
    <DropdownItem>Item Text</DropdownItem>
    <DropdownItem>Item Text</DropdownItem>
  </Dropdown>
</template>
```
