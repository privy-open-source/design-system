---
title: Input · Components
description: Base text-input form.
---

<script setup>
  import pInput from "./Input.vue"
  import { ref } from "vue-demi"
  import IconAt from '@privyid/persona-icon/vue/address/20.vue'
  import IconCheck from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
  import IconEmail from '@privyid/persona-icon/vue/email/20.vue'
  import PSpinner from '../spinner/Spinner.vue'

  const value  = ref('')
  const result = ref('')
</script>

# Input

> Base text-input form.

## Usage

### Simple Usage

<preview>
  <p-input v-model="value" placeholder="Input Here" />
</preview>

```vue
<template>
  <p-input v-model="value" placeholder="Input Here" />
</template>
```

## Sizing
Input has 4 variants size: `xs`, `sm`, `md`, `lg`, default is `md`.

<preview class="flex-col space-y-3">
  <p-input size="xs" />
  <p-input size="sm" />
  <p-input size="md" />
  <p-input size="lg" />
</preview>

```vue
<template>
  <p-input size="xs" />
  <p-input size="sm" />
  <p-input size="md" />
  <p-input size="lg" />
</template>
```

## Disabled state

<preview class="flex-col space-y-3">
  <p-input disabled />
</preview>

```vue
<template>
  <p-input disabled />
</template>
```

## Readonly state

<preview class="flex-col space-y-3">
  <p-input readonly />
</preview>

```vue
<template>
  <p-input readonly />
</template>
```

## Error state

<preview class="flex-col space-y-3">
  <p-input error />
</preview>

```vue
<template>
  <p-input error />
</template>
```

## Clearable

Add clear button to input with prop `clearable`.

<preview class="flex-col space-y-3">
  <p-input clearable />
</preview>

```vue
<template>
  <p-input clearable />
</template>
```

## Prepend & Append
Input has append & prepend feature to place content inside input field. But the content that can be inserted is limited, which is only an icon.

### Prepend
<preview class="flex-col space-y-3">
  <p-input>
    <template #prepend>
      <IconAt />
    </template>
  </p-input>
  <p-input>
    <template #prepend>
      <IconEmail class="text-muted" />
    </template>
  </p-input>
</preview>

```vue
<template>
  <p-input>
    <template #prepend>
      <IconAt />
    </template>
  </p-input>
  <p-input>
    <template #prepend>
      <IconEmail class="text-muted" />
    </template>
  </p-input>
</template>
```

### Append
<preview class="flex-col space-y-3">
  <p-input>
    <template #append>
      <IconCheck class="text-success" />
    </template>
  </p-input>
  <p-input>
    <template #append>
      <p-spinner />
    </template>
  </p-input>
</preview>

```vue
<template>
  <p-input>
    <template #append>
      <IconCheck class="text-success" />
    </template>
  </p-input>
  <p-input>
    <template #append>
      <p-spinner />
    </template>
  </p-input>
</template>
```

## Accept Character

You can filter what characters are allowed to be input using the prop `accept`. The value can be RegExp, or using available preset.

<preview class="flex-col space-y-4">
  <p-input accept="0-9" placeholder="Numeric Only (Manual)" />
  <p-input accept="numeric" placeholder="Numeric Only (using Preset)" />
</preview>

```vue
<template>
  <p-input accept="0-9" placeholder="Numeric Only (Manual)" />
  <p-input accept="numeric" placeholder="Numeric Only (using Preset)" />
</template>
```

### Available Preset

<div class="overflow-x-auto">

| Preset                       | RegExp                                                           | Alias                            |
|------------------------------|------------------------------------------------------------------|----------------------------------|
| `numeric`                    | `0-9`                                                            | `num`, `digit`                   |
| `alpha`                      | `A-Za-z`                                                         |                                  |
| `alpha-space`                | `A-Za-z\s`                                                       |                                  |
| `alpha-space-symbol`         | <code>A-Za-z\s!"#$%&\'()*+,./:;<=>?@[\\\]^_&#96;{\|}~-</code>    | `non-numeric`                    |
| `alpha-numeric`              | `A-Za-z0-9`                                                      | `alpha-num`                      |
| `alpha-numeric-space`        | `A-Za-z0-9\s`                                                    | `alpha-num-space`                |
| `alpha-numeric-space-symbol` | <code>A-Za-z0-9\s!"#$%&\'()*+,./:;<=>?@[\\\]^_&#96;{\|}~-</code> | `text`, `alpha-num-space-symbol` |
| `numeric-space`              | `0-9\s`                                                          | `num-space`                      |
| `numeric-space-symbol`       | <code>0-9\s!"#$%&\'()*+,./:;<=>?@[\\\]^_&#96;{\|}~-</code>       | `non-alpha`, `num-space-symbol`  |

</div>

## Binding v-model

Input value can be binding with `v-model`.

<preview>
  <p-input v-model="result" />
</preview>

**result:**

<pre class="truncate"><code>{{ result || '-' }}</code></pre>

```vue
<template>
  <p-input v-model="result" />
</template>
```

## API

### Props

| Props             |              Type               | Default | Description                                             |
|-------------------|:-------------------------------:|:-------:|---------------------------------------------------------|
| `type`            |            `String`             | `text`  | Input type                                              |
| `size`            |            `String`             |  `md`   | Input size variant, valid value: `xs`, `sm`, `md`, `lg` |
| `placeholder`     |            `String`             |   `-`   | Input placeholder                                       |
| `disabled`        |            `Boolean`            | `false` | Disabled state                                          |
| `readonly`        |            `Boolean`            | `false` | Readonly state                                          |
| `error`           |            `Boolean`            | `false` | Error state                                             |
| `clearable`       |            `Boolean`            | `false` | Enable clear button                                     |
| `accept`          |            `String`             |   `-`   | Whitelist character can be inputted                     |
| `modelValue`      |            `String`             |   `-`   | v-model value                                           |
| `container-class` | `String` or `Array` or `Object` |   `-`   | CSS class to add in the input container                 |

### Slots

| Name      | Description                                         |
|-----------|-----------------------------------------------------|
| `prepend` | Content to place icon inside of prepend input field |
| `append`  | Content to place icon inside of append input field  |

### Events

| Name     | Arguments | Description                     |
|----------|-----------|---------------------------------|
| `change` | `String`  | Event when value changed        |
| `clear`  | `-`       | Event when clear button clicked |

## See Also

- [Form Group](/components/form-group/)
- [Input Group](/components/input-group/)
