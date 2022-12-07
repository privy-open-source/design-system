<script setup>
  import pInput from "./Input.vue"
  import { ref } from "vue-demi"

  const value = ref('')
</script>

# Input

## Usage

### Simple Usage
<preview>
  <p-input v-model.number="value" placeholder="Input Here" />
</preview>

```vue
<template>
  <p-input v-model="value" placeholder="Input Here" />
</template>
```

## Sizing

<preview class="flex-col space-gap-3">
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

<preview class="flex-col space-gap-3">
  <p-input disabled />
</preview>

```vue
<template>
  <p-input disabled />
</template>
```

## Readonly state

<preview class="flex-col space-gap-3">
  <p-input readonly />
</preview>

```vue
<template>
  <p-input readonly />
</template>
```

## Error state

<preview class="flex-col space-gap-3">
  <p-input error />
</preview>

```vue
<template>
  <p-input error />
</template>
```

## Clearable

Add clear button to input with prop `clearable`.

<preview class="flex-col space-gap-3">
  <p-input clearable />
</preview>

```vue
<template>
  <p-input clearable />
</template>
```
