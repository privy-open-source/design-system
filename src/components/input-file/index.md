<script setup>
  import pInputFile from "./InputFile.vue"
  import { ref } from "vue-demi"

  const value = ref('')
</script>

# Input File

## Usage

### Simple Usage

<preview>
  <p-input-file multiple />
</preview>

## Sizing

<preview class="flex-col space-gap-3">
  <p-input-file size="xs" />
  <p-input-file size="sm" />
  <p-input-file size="md" />
  <p-input-file size="lg" />
</preview>

```vue
<template>
  <p-input-file size="xs" />
  <p-input-file size="sm" />
  <p-input-file size="md" />
  <p-input-file size="lg" />
</template>
```

## Disabled State

<preview class="flex-col space-gap-3">
  <p-input-file disabled />
</preview>

## Readonly State

<preview class="flex-col space-gap-3">
  <p-input-file readonly />
</preview>

## Error State

<preview class="flex-col space-gap-3">
  <p-input-file error />
</preview>

## Clearable

<preview class="flex-col space-gap-3">
  <p-input-file clearable />
</preview>
