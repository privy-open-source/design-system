<script setup>
  import pRingbar from './Ringbar.vue'
  import pInputRange from '../input-range/InputRange.vue'
  import { ref } from 'vue-demi'

  const value = ref(50)
</script>

# Ringbar

> Progressbar but circular

## Usage

### Simple Usage

<preview class="space-x-4">
  <p-ringbar value="15" />
  <p-ringbar value="25" />
  <p-ringbar value="50" />
  <p-ringbar value="75" />
  <p-ringbar value="100" />
</preview>

```vue
<template>
  <p-ringbar value="15" />
  <p-ringbar value="25" />
  <p-ringbar value="50" />
  <p-ringbar value="75" />
  <p-ringbar value="100" />
</template>
```

### With Input Range

<preview class="flex-col space-y-4">
  <p-input-range v-model="value" />
  <p-ringbar :value="value" />
</preview>

```vue
<template>
  <p-input-range v-model="value" />
  <p-ringbar :value="value" />
</template>

<script lang="ts" setup>
const value = ref(50)
</script>
```

## Sizing

<preview class="space-x-4">
  <p-ringbar value="75" size="xs" />
  <p-ringbar value="75" size="sm" />
  <p-ringbar value="75" size="md" />
  <p-ringbar value="75" size="lg" />
</preview>

```vue
<template>
  <p-ringbar value="75" size="xs" />
  <p-ringbar value="75" size="sm" />
  <p-ringbar value="75" size="md" />
  <p-ringbar value="75" size="lg" />
</template>
```

## Indeterminate Mode

<preview>
  <p-ringbar indeterminate />
</preview>

```vue
<template>
  <p-ringbar indeterminate />
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

## See Also

- [Progressbar](../progressbar/)
- [Spinner](../spinner/)
