---
title: Tooltip · Components
description: Directive for add tooltip to element.
---

<script setup lang="ts">
  import { vPTooltip } from '.'
  import pButton from '../button/Button.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import { ref } from 'vue-demi'
  import { showTooltip, hideTooltip, toggleTooltip } from '.'

  const show = ref(false)
</script>

# Tooltip

> Directive for add tooltip to element.

## Usage

### Simple Usage

<preview class="space-x-2">
  <span v-p-tooltip title="Hello I'm Tooltip">
    Hover Me
  </span>
</preview>

```vue
<template>
  <span v-p-tooltip title="Hello I'm Tooltip">
    Hover Me
  </span>
</template>

<script setup>
import { vPTooltip } from '@privyid/persona/directive'
</script>
```

### With Markdown

<preview >
  <span v-p-tooltip title="**Hello** _I'm_ ~~Reyhan~~ Tooltip">
    Hover Me
  </span>
</preview>

```vue
<template>
  <span v-p-tooltip title="**Hello** _I'm_ ~~Reyhan~~ Tooltip">
    Hover Me
  </span>
</template>

<script setup>
import { vPTooltip } from '@privyid/persona/directive'
</script>
```

## Color

You can change tooltip color using modifiers `.black`, `.white`, default is `black`

<preview class="space-x-2">
  <p-button v-p-tooltip.black title="Black">Black</p-button>
  <p-button v-p-tooltip.white title="White">White</p-button>
</preview>

## Placement

You can change tooltip position using modifiers `.top`, `.left`, `.right`, and `.bottom`. default is `top`.

<preview class="flex-col space-gap-2 md:flex-row">
  <p-button v-p-tooltip.top title="Top">Top</p-button>
  <p-button v-p-tooltip.left title="Left">Left</p-button>
  <p-button v-p-tooltip.right title="Right">Right</p-button>
  <p-button v-p-tooltip.bottom title="Bottom">Bottom</p-button>
</preview>

```vue
<template>
  <p-button v-p-tooltip.top title="Top">Top</p-button>
  <p-button v-p-tooltip.left title="Left">Left</p-button>
  <p-button v-p-tooltip.right title="Right">Right</p-button>
  <p-button v-p-tooltip.bottom title="Bottom">Bottom</p-button>
</template>
```

### Placement Align

You can combine with modifier `.start` and `.end` to set tooltip align.

<preview>
  <div class="flex flex-col space-gap-2 md:flex-row">
    <p-button v-p-tooltip.bottom title="Bottom">Bottom</p-button>
    <p-button v-p-tooltip.bottom.start title="Bottom Start">Start</p-button>
    <p-button v-p-tooltip.bottom.end title="Bottom End">End</p-button>
  </div>
</preview>

```vue
<template>
  <p-button v-p-tooltip.bottom title="Bottom">Bottom</p-button>
  <p-button v-p-tooltip.bottom.start title="Bottom Start">Start</p-button>
  <p-button v-p-tooltip.bottom.end title="Bottom End">End</p-button>
</template>
```

## Trigger

Tooltips can be triggered (opened/closed) using modifiers `.click`, `.hover` and `.focus`. The default trigger is `hover` + `focus`.

<preview>
  <div class="flex flex-col space-gap-2 md:flex-row">
    <p-button v-p-tooltip title="Hover + Focus">Default</p-button>
    <p-button v-p-tooltip.click title="Click">Click</p-button>
    <p-button v-p-tooltip.hover title="Hover">Hover</p-button>
    <p-button v-p-tooltip.focus title="Focus">Focus</p-button>
  </div>
</preview>

```vue
<template>
  <p-button v-p-tooltip title="Hover + Focus">Default</p-button>
  <p-button v-p-tooltip.click title="Click">Click</p-button>
  <p-button v-p-tooltip.hover title="Hover">Hover</p-button>
  <p-button v-p-tooltip.focus title="Focus">Focus</p-button>
</template>
```

### Manual Trigger

If you prefer to trigger manually, add modifiers `.manual` and combine it with some ref.

<preview class="flex flex-col space-gap-2 md:flex-row">
  <p-button v-p-tooltip.manual="show" title="Hello I'm Tooltip">
    Lorem Ipsum
  </p-button>
  <p-checkbox v-model="show">Show Tooltip</p-checkbox>
</preview>

```vue
<template>
  <p-button v-p-tooltip.manual="show" title="Hello I'm Tooltip">
    Lorem Ipsum
  </p-button>
  <p-checkbox v-model="show">Show Tooltip</p-checkbox>
</template>

<script lang="ts" setup>
  const show = ref(false)
</script>
```

### Programmatic Trigger

Alternatively, you can manual trigger tooltip using `showTooltip`, `hideToolip`, or `toggleTooltip` function.

<preview class="flex flex-col space-gap-2 md:flex-row">
  <span v-p-tooltip.manual title="Hello I'm Tooltip" id="tooltip-manual">
    Lorem Ipsum
  </span>
  <p-button @click="showTooltip('#tooltip-manual')">Show</p-button>
  <p-button @click="hideTooltip('#tooltip-manual')">Hide</p-button>
  <p-button @click="toggleTooltip('#tooltip-manual')">Toggle</p-button>
</preview>

```vue
<template>
  <span v-p-tooltip.manual title="Hello I'm Tooltip" id="tooltip-manual">
    Lorem Ipsum
  </span>
  <p-button @click="showTooltip('#tooltip-manual')">Show</p-button>
  <p-button @click="hideTooltip('#tooltip-manual')">Hide</p-button>
  <p-button @click="toggleTooltip('#tooltip-manual')">Toggle</p-button>
</template>

<script lang="ts" setup>
  import {
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } from '@privyid/persona/core'
</script>
```

## API

### Modifiers

| Modifiers | Description                  |
|-----------|------------------------------|
| `black`   | Enable color `black`         |
| `white`   | Enable color `white`         |
| `top`     | Set placement to top         |
| `left`    | Set placement to left        |
| `right`   | Set placement to right       |
| `bottom`  | Set placement to bottom      |
| `start`   | Set placement align to start |
| `end`     | Set placement align to end   |
| `hover`   | Enable hover trigger         |
| `click`   | Enable click trigger         |
| `focus`   | Enable focus trigger         |

### Events

| Name           | Arguments               | Description                     |
|----------------|-------------------------|---------------------------------|
| `tooltip:show` | Native DOM Event object | Event when tooltip will be show |
| `tooltip:hide` | Native DOM Event object | Event when tooltip will be hide |
