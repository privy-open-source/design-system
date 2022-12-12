<script setup>
  import pInput from "./Input.vue"
  import { ref } from "vue-demi"

  const value = ref('')
</script>

# Input

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

## API

### Props

| Props         |   Type    | Default | Description                                             |
|---------------|:---------:|:-------:|---------------------------------------------------------|
| `type`        | `String`  | `text`  | Input type                                              |
| `size`        | `String`  |  `md`   | Input size variant, valid value: `xs`, `sm`, `md`, `lg` |
| `placeholder` | `String`  |   `-`   | Input placeholder                                       |
| `disabled`    | `Boolean` | `false` | Disabled state                                          |
| `readonly`    | `Boolean` | `false` | Readonly state                                          |
| `error`       | `Boolean` | `false` | Error state                                             |
| `clearable`   | `Boolean` | `false` | Enable clear button                                     |
| `modelValue`  | `String`  |   `-`   | v-model value                                           |

### Slots

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" class="text-center">There no slots here</td>
    </tr>
  </tbody>
</table>

### Events

| Name     | Arguments | Description                     |
|----------|-----------|---------------------------------|
| `change` | `String`  | Event when value changed        |
| `clear`  | `-`       | Event when clear button clicked |

## See Also

- [Form Group](/components/form-group/)
- [Input Group](/components/input-group/)
