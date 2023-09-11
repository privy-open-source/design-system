---
title: Sheet · Components
description: Off-Canvas container.
---

<script setup>
  import { ref } from "vue-demi"
  import pButton from "../button/Button.vue"
  import pSheet from "./Sheet.vue"
  import { vPAspectRatio } from '../aspect-ratio'

  const model  = ref(false)
  const left   = ref(false)
  const right  = ref(false)
  const top    = ref(false)
  const bottom = ref(false)

  const sm = ref(false)
  const md = ref(false)
  const lg = ref(false)
  const xl = ref(false)
</script>

# Sheet

> Off-Canvas container.

## Usage

### Simple Usage

<p-button class="mt-4" @click="model = !model">
  Live Demo
</p-button>

<p-sheet v-model="model" no-backdrop>
  <div class="p-4">
    Hello World
  </div>
</p-sheet>

```vue
<template>
  <p-sheet v-model="isOpen">
    <div class="p-4">
      Hello World
    </div>
  </p-sheet>
</template>

<script setup lang="ts">
  const isOpen = ref(true)
</script>
```

## Position

There are 4 positions you can use, `left`, `right`, `top` and `bottom`. Default is `left`.

<div class="flex space-gap-3">
  <p-button @click="left = true">
    Left
  </p-button>
  <p-button @click="top = true">
    Top
  </p-button>
  <p-button @click="right = true">
    Right
  </p-button>
  <p-button @click="bottom = true">
    Bottom
  </p-button>
</div>

<p-sheet v-model="left" position="left">
  <div class="p-4">
    Position Left
  </div>
</p-sheet>
<p-sheet v-model="top" position="top">
  <div class="p-4">
    Position Top
  </div>
</p-sheet>
<p-sheet v-model="right" position="right">
  <div class="p-4">
    Position Right
  </div>
</p-sheet>
<p-sheet v-model="bottom" position="bottom">
  <div class="p-4">
    Position Bottom
  </div>
</p-sheet>

```vue
<template>
  <p-sheet v-model="model" position="left">
    <div class="p-4">
      Position Left
    </div>
  </p-sheet>
  <p-sheet v-model="model2" position="top">
    <div class="p-4">
      Position Top
    </div>
  </p-sheet>
  <p-sheet v-model="model3" position="right">
    <div class="p-4">
      Position Right
    </div>
  </p-sheet>
  <p-sheet v-model="model4" position="bottom">
    <div class="p-4">
      Position Bottom
    </div>
  </p-sheet>
</template>
```

## Sizing

There are 4 sizes you can use, `sm`, `md`, `lg` and `xl`. Default is `sm`.

<div class="flex space-gap-3">
  <p-button @click="sm = true">
    sm
  </p-button>
  <p-button @click="md = true">
    md
  </p-button>
  <p-button @click="lg = true">
    lg
  </p-button>
  <p-button @click="xl = true">
    xl
  </p-button>
</div>

<p-sheet v-model="sm" size="sm">
  <div class="p-4">
    Small
  </div>
</p-sheet>
<p-sheet v-model="md" size="md">
  <div class="p-4">
    Medium
  </div>
</p-sheet>
<p-sheet v-model="lg" size="lg">
  <div class="p-4">
    Large
  </div>
</p-sheet>
<p-sheet v-model="xl" size="xl">
  <div class="p-4">
    Extra Large
  </div>
</p-sheet>

```vue
<template>
  <p-sheet v-model="modelSM" size="sm">
    <div class="p-4">
      Small
    </div>
  </p-sheet>
  <p-sheet v-model="modelMD" size="md">
    <div class="p-4">
      Medium
    </div>
  </p-sheet>
  <p-sheet v-model="modelLG" size="lg">
    <div class="p-4">
      Large
    </div>
  </p-sheet>
  <p-sheet v-model="modelXL" size="xl">
    <div class="p-4">
      Extra Large
    </div>
  </p-sheet>
</template>
```

## API

### Props

| Props               |   Type    | Default | Description                                                    |
|---------------------|:---------:|:-------:|----------------------------------------------------------------|
| `position`          | `String`  | `left`  | Sheet positions, valid value: `left`, `right`, `top`, `bottom` |
| `size`              | `String`  |  `sm`   | Sheet size, valid value: `sm`, `md`, `lg`, `xl`                |
| `noCloseOnEsc`      | `Boolean` | `false` | No close modal while Escape was pressed                        |
| `noCloseOnBackdrop` | `Boolean` | `false` | Disabled close when click on backdrop                          |

### Slots

| Name      | Description                       |
|-----------|-----------------------------------|
| `default` | Content to place inside the sheet |

### Events

| Name    | Arguments | Description                   |
|---------|-----------|-------------------------------|
| `close` | -         | Event when sheet wµill closed |

## See Also

- [Card](/components/card/)
- [Modal](/components/modal/)
