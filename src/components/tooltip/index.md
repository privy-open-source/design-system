<script setup>
  import { vPTooltip } from '.'
  import pButton from '../button/Button.vue'
  import { ref } from 'vue-demi'

  const title = ref('Hello World')
</script>

# Tooltip

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

<preview class="flex-col space-y-2 md:flex-row md:space-x-2">
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

<preview class="flex-col space-y-2 md:flex-row md:space-x-2">
  <p-button v-p-tooltip.bottom title="Bottom">Bottom</p-button>
  <p-button v-p-tooltip.bottom.start title="Bottom Start">Start</p-button>
  <p-button v-p-tooltip.bottom.end title="Bottom End">End</p-button>
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

<preview class="flex-col space-y-2 md:flex-row md:space-x-2">
  <p-button v-p-tooltip title="Hover + Focus">Default</p-button>
  <p-button v-p-tooltip.click title="Click">Click</p-button>
  <p-button v-p-tooltip.hover title="Hover">Hover</p-button>
  <p-button v-p-tooltip.focus title="Focus">Focus</p-button>
</preview>

```vue
<template>
  <p-button v-p-tooltip title="Hover + Focus">Default</p-button>
  <p-button v-p-tooltip.click title="Click">Click</p-button>
  <p-button v-p-tooltip.hover title="Hover">Hover</p-button>
  <p-button v-p-tooltip.focus title="Focus">Focus</p-button>
</template>
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
