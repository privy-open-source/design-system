<script setup>
  import pInputPassword from "./InputPassword.vue"
  import { ref } from "vue-demi"

  const result = ref()
</script>

# Input Password

## Usage

### Simple Usage

<preview>
  <p-input-password />
</preview>

```vue
<template>
  <p-input-password />
</template>
```

## Sizing

<preview class="flex-col space-y-3">
  <p-input-password size="xs" />
  <p-input-password size="sm" />
  <p-input-password size="md" />
  <p-input-password size="lg" />
</preview>

```vue
<template>
  <p-input-password size="xs" />
  <p-input-password size="sm" />
  <p-input-password size="md" />
  <p-input-password size="lg" />
</template>
```

## Disabled State

<preview class="flex-col space-y-3">
  <p-input-password disabled />
</preview>

```vue
<template>
  <p-input-password disabled />
</template>
```

## Readonly State

<preview class="flex-col space-y-3">
  <p-input-password readonly />
</preview>

```vue
<template>
  <p-input-password readonly />
</template>
```

## Error State

<preview class="flex-col space-y-3">
  <p-input-password error />
</preview>

```vue
<template>
  <p-input-password error />
</template>
```

## Clearable

<preview>
  <p-input-password clearable />
</preview>

```vue
<template>
  <p-input-password clearable />
</template>
```

## Binding v-model

Like other input, input value can be binding with `v-model`.

<preview>
  <p-input-password v-model="result" />
</preview>

**result:**

<pre class="truncate"><code>{{ result || '-' }}</code></pre>

```vue
<template>
  <p-input-password v-model="result" />
</template>
```

## API

### Props

| Props         |   Type    | Default | Description                                             |
|---------------|:---------:|:-------:|---------------------------------------------------------|
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

- [Input](/components/input/)
- [Input Group](/components/input-group/)
- [Strengthbar](/components/strengthbar/)
