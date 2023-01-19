---
title: Input Password · Components
description: One at time input form.
---

<script setup>
  import pInputPin from './InputPin.vue'
  import { ref } from 'vue-demi'

  const result = ref('')
</script>

# Input Pin

> One at time input form.

## Usage

### Simple Usage

<preview>
  <p-input-pin />
</preview>

```vue
<template>
  <p-input-pin />
</template>
```

## Number of Input

You can set how many input digit do you want with prop `length`, default is `5`.

<preview>
  <p-input-pin length="3" />
</preview>

```vue
<template>
  <p-input-pin length="3" />
</template>
```

## Disabled State

<preview>
  <p-input-pin disabled />
</preview>

```vue
<template>
  <p-input-pin disabled />
</template>
```

## Readonly State
<preview>
  <p-input-pin readonly />
</preview>

```vue
<template>
  <p-input-pin readonly />
</template>
```

## Error State
<preview>
  <p-input-pin error />
</preview>

```vue
<template>
  <p-input-pin error />
</template>
```

## Binding v-model

Like other input, input value can be binding with `v-model`.

<preview>
  <p-input-pin v-model="result" />
</preview>

**result:**

<pre class="truncate"><code>{{ result || '-' }}</code></pre>

```vue
<template>
  <p-input-pin v-model="result" />
</template>
```

## Binding v-model

## API

### Props

| Props         |   Type    | Default | Description       |
|---------------|:---------:|:-------:|-------------------|
| `length`      | `Number`  |   `5`   | Number of input   |
| `disabled`    | `Boolean` | `false` | Disabled state    |
| `readonly`    | `Boolean` | `false` | Readonly state    |
| `error`       | `Boolean` | `false` | Error state       |
| `modelValue`  | `String`  |   `-`   | v-model value     |

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

## See Also

- [Form Group](/components/form-group/)
- [Input Group](/components/input-group/)
