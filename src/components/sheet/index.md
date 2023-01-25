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
</script>

# Sheet

> Off-Canvas container.

## Usage

### Simple Usage

<p-button class="mt-4" color="primary" @click="model = true">
  Live Demo
</p-button>

<p-sheet v-model="model" position="left">
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
  <p-button color="primary" @click="left = true">
    Left
  </p-button>
  <p-button color="primary" @click="top = true">
    Top
  </p-button>
  <p-button color="primary" @click="right = true">
    Right
  </p-button>
  <p-button color="primary" @click="bottom = true">
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
## API

### Props

| Props               |   Type    | Default | Description                                                    |
|---------------------|:---------:|:-------:|----------------------------------------------------------------|
| `position`          | `String`  | `left`  | Sheet positions, valid value: `left`, `right`, `top`, `bottom` |
| `noCloseOnBackdrop` | `Boolean` | `false` | Disabled close when click on backdrop                          |
| `zIndex`            | `Number`  |  `50`   | Sheet z-index value                                            |

### Slots

| Name      | Description                       |
|-----------|-----------------------------------|
| `default` | Content to place inside the sheet |

### Events

| Name   | Arguments | Description             |
|--------|-----------|-------------------------|
| `show` | -         | Event when sheet shown  |
| `hide` | -         | Event when sheet hidden |

## See Also

- [Card](/components/card/)
- [Modal](/components/modal/)
