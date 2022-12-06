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

## Type Variants

<preview class="flex-col space-gap-3">
  <p-input type="button" placeholder="button" />
  <p-input type="checkbox" placeholder="checkbox" />
  <p-input type="color" placeholder="color" />
  <p-input type="date" placeholder="date" />
  <p-input type="datetime-local" placeholder="datetime" />
  <p-input type="email" placeholder="email" />
  <p-input type="file" placeholder="file" />
  <p-input type="hidden" placeholder="hidden" />
  <p-input type="image" placeholder="image" />
  <p-input type="month" placeholder="month" />
  <p-input type="number" placeholder="number" />
  <p-input type="password" placeholder="password" />
  <p-input type="radio" placeholder="radio" />
  <p-input type="range" placeholder="range" />
  <p-input type="reset" placeholder="reset" />
  <p-input type="search" placeholder="search" />
  <p-input type="submit" placeholder="submit" />
  <p-input type="tel" placeholder="tel" />
  <p-input type="text" placeholder="text" />
  <p-input type="time" placeholder="time" />
  <p-input type="url" placeholder="url" />
  <p-input type="week" placeholder="week" />
</preview>

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
