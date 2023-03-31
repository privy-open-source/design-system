---
title: Input Group · Components
description: Combine multiple input in singleline.
---

<script setup>
  import pInput from '../input/Input.vue'
  import pInputGroup from './InputGroup.vue'
  import pInputGroupAddon from './InputGroupAddon.vue'
  import pButton from '../button/Button.vue'
  import pDivider from '../divider/Divider.vue'
  import pSelect from '../select/Select.vue'
  import IconEmail from '@carbon/icons-vue/lib/at/16'
  import { ref } from 'vue-demi'

  const select = ref()
</script>

# Input Group

> Combine multiple input in singleline.

## Usage

### Simple Usage

<preview>
  <p-input-group>
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group>
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</template>
```

### With Addon

<preview class="flex-col space-y-3">
  <p-input-group>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-input />
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider vertical />
    <p-input />
  </p-input-group>
</template>
```

### With Addon and Divider

<preview class="flex-col space-y-3">
  <p-input-group>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider vertical />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider vertical />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</template>
```

### Input and Select

<preview>
  <p-input-group size="lg">
    <p-select v-model="select" :options="['A', 'B', 'C']" />
    <p-input />
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group>
    <p-select :options="['A', 'B', 'C']" />
    <p-input />
  </p-input-group>
</template>
```

### Multiple Input

<preview>
  <p-input-group>
    <p-input />
    <p-divider vertical />
    <p-input />
    <p-divider vertical />
    <p-input />
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group>
    <p-input />
    <p-divider vertical />
    <p-input />
    <p-divider vertical />
    <p-input />
  </p-input-group>
</template>
```

## Sizing

Input Group also has 4 variants size: `xs`, `sm`, `md`, `lg`, default is `md`.

<preview class="flex-col space-y-3">
  <p-input-group size="xs">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
  <p-input-group size="sm">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
  <p-input-group size="md">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
  <p-input-group size="lg">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group size="xs">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
  <p-input-group size="sm">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
  <p-input-group size="md">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
  <p-input-group size="lg">
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</template>
```

## Disabled State

Adding prop `disabled` to Input Group to unified input into disabled state

<preview>
  <p-input-group disabled>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider vertical />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group disabled>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider vertical />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</template>
```

## Error State

Adding prop `error` to Input Group to unified input into error state

<preview>
  <p-input-group error>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider vertical />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</preview>

```vue
<template>
  <p-input-group error>
    <p-input-group-addon>
      <IconEmail />
    </p-input-group-addon>
    <p-divider vertical />
    <p-input />
    <p-button variant="input">
      Submit
    </p-button>
  </p-input-group>
</template>
```

## API

### Props

| Props      |   Type    | Default | Description                                             |
|------------|:---------:|:-------:|---------------------------------------------------------|
| `size`     | `String`  |  `md`   | Input size variant, valid value: `xs`, `sm`, `md`, `lg` |
| `disabled` | `Boolean` | `false` | Disabled state                                          |
| `readonly` | `Boolean` | `false` | Readonly state                                          |
| `error`    | `Boolean` | `false` | Error state                                             |

### Slots

| Name      | Description                   |
|-----------|-------------------------------|
| `default` | Content to place a form input |

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
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

## See Also
