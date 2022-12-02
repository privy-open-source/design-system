<script setup>
  import pInputRange from './InputRange.vue'
  import { ref } from 'vue-demi'

  const value = ref(50)
</script>

# Input Range

## Usage

### Simple Usage

<preview class="flex-col">
  <p-input-range />
</preview>

```vue
<template>
  <p-input-range />
</template>
```

### with Min, Max & Step

<preview class="flex-col">
  <p-input-range min="0" max="100" step="25" />
</preview>

```vue
<template>
  <p-input-range min="0" max="100" step="25" />
</template>
```


## Multiple Mode

<preview class="flex-col">
  <p-input-range multiple />
</preview>

```vue
<template>
  <p-input-range multiple />
</template>
```

## Disabled State

<preview class="flex-col">
  <p-input-range disabled />
</preview>

```vue
<template>
  <p-input-range disabled />
</template>
```

## Readonly State

<preview class="flex-col">
  <p-input-range readonly />
</preview>

```vue
<template>
  <p-input-range readonly />
</template>
```
