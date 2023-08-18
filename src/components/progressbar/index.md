<script setup>
  import pProgressbar from './Progressbar.vue'
  import pInputRange from '../input-range/InputRange.vue'
  import { ref } from 'vue-demi'

  const value = ref(50)
</script>

# Progressbar

> TODO

## Usage

### Simple Usage

<preview class="flex-col space-y-4">
  <p-progressbar value="15" />
  <p-progressbar value="25" />
  <p-progressbar value="50" />
  <p-progressbar value="75" />
  <p-progressbar value="100" />
</preview>

```vue
<template>
  <p-progressbar value="15" />
  <p-progressbar value="25" />
  <p-progressbar value="50" />
  <p-progressbar value="75" />
  <p-progressbar value="100" />
</template>
```

### With Input Range

<preview class="flex-col space-y-4">
  <p-input-range v-model="value" />
  <p-progressbar :value="value" />
</preview>

```vue
<template>
  <p-input-range v-model="value" />
  <p-progressbar :value="value" />
</template>

<script lang="ts" setup>
const value = ref(50)
</script>
```

## Success State

<preview>
  <p-progressbar success />
</preview>

```vue
<template>
  <p-progressbar success />
</template>
```

## Error State

<preview>
  <p-progressbar error />
</preview>

```vue
<template>
  <p-progressbar error />
</template>
```

## Indeterminate Mode

<preview>
  <p-progressbar indeterminate />
</preview>

```vue
<template>
  <p-progressbar indeterminate />
</template>
```

## API

### Props

| Props           |   Type    | Default | Description                                    |
|-----------------|:---------:|:-------:|------------------------------------------------|
| `size`          | `String`  |  `md`   | Ring size, valid value: `xs`, `sm`, `md`, `lg` |
| `min`           | `Number`  |   `0`   | Lowest progress value                          |
| `max`           | `Number`  |  `100`  | Highest progress value                         |
| `value`         | `Number`  |   `-`   | Progress value                                 |
| `indeterminate` | `Boolean` | `false` | Enable indterminate mode                       |

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
