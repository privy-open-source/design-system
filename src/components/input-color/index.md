---
title: Input Color · Components
description: Base color-input form.
---

<script setup>
  import pInputColor from './inputColor.vue'
  import pButton from '../button/Button.vue'
  import { ref } from 'vue-demi'

  const colorDefault = ref('')
  const colorCustom = ref('')
  const color = ref('')
</script>

# Input Color

> Base color-input form.

## Usage

### Simple Usage

<preview>
  <p-input-color />
</preview>

```vue
<template>
  <p-input-color />
</template>
```

## Variant
Input color also available with variant `circle`. When variant is not set, input color will looks as `default`.

<preview>
  <p-input-color variant="circle" />
</preview>

```vue
<template>
  <p-input-color variant="circle" />
</template>
```

## Disabled state

<preview>
  <p-input-color disabled />
</preview>

```vue
<template>
  <p-input-color disabled />
</template>
```

## Error state

<preview>
  <p-input-color error />
</preview>

```vue
<template>
  <p-input-color error />
</template>
```

## Binding v-model

<preview>
  <p-input-color v-model="color" />
</preview>
<div class="flex flex-col mt-2 space-y-1">
  <strong>Result: {{ color }}</strong>
</div>

```vue
<template>
  <p-input-color v-model="color" />
</template>

<script lang="ts" setup>
  const color = ref('')
</script>
```

## Clearable
Clear button are hidden by default. To show clear button, you can set `clearable` to `true`.

### Default clearable
<preview class="space-x-6">
  <p-input-color clearable v-model="colorDefault" />
</preview>

```vue
<template>
  <p-input-color clearable v-model="color" />
</template>
```

### Custom clearable

<preview class="space-x-6">
  <p-input-color clearable v-model="colorCustom">
    <template #clearable="{ clear }">
      <p-button :disabled="!colorCustom" style="--p-button-sm-padding-x: 0" size="sm" variant="link" @click="clear">Reset</p-button>
    </template>
  </p-input-color>
</preview>

```vue
<template>
  <p-input-color clearable v-model="color">
    <template #clearable="{ clear }">
      <p-button 
        :disabled="!color" 
        style="--p-button-sm-padding-x: 0" 
        size="sm" 
        variant="link" 
        @click="clear">Reset</p-button>
    </template>
  </p-input-color>
</template>
```

## API

### Props

| Props             |              Type               | Default | Description                                             |
|-------------------|:-------------------------------:|:-------:|---------------------------------------------------------|
| `variant`         |            `String`             | `-`     | Input color style variant, valid value: `default` and `circle`  |
| `disabled`        |            `Boolean`            | `false` | Disabled state                                          |
| `error`           |            `Boolean`            | `false` | Error state                                             |
| `clearable`       |            `Boolean`            | `false` | Enable clear button                                     |
| `modelValue`      |            `String`             |   `-`   | v-model value                                           |
| `container-class` | `String` or `Object`            |   `-`   | CSS class to add in the input color container           |

### Slots

| Name        | Description                                         |
|-------------|-------------------------------------------------------|
| `clearable` | Content to place custom clear action of input color |

### Events

| Name     | Arguments | Description                     |
|----------|-----------|---------------------------------|
| `clear`  | `-`       | Event when clear button clicked |
