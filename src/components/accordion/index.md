---
title: Accordion · Components
description: Display content with collapse behavior
---

<script setup>
  import pAccordion from './Accordion.vue'
  import pAccordionItem from './AccordionItem.vue'
  import { defineAccordion } from '.'
  import CaretUp from '@privyid/persona-icon/vue/caret-up/16.vue'
  import CaretDown from '@privyid/persona-icon/vue/caret-down/16.vue'
  import { ref } from 'vue-demi'

  const items = defineAccordion([
    {
      title  : 'Item Title 1',
      content: 'Content Item 1',
    },
    {
      title  : 'Item Title 2',
      content: 'Content Item 2',
    },
    {
      title   : 'Item Title 3',
      content : 'Content Item 3',
      disabled: true,
    },
    {
      title  : 'Item Title 4',
      content: 'Content Item 4',
    },
  ])

  const active   = ref()
  const expanded = ref(false)
</script>

# Accordion

> Display content with collapse behavior

## Usage

### Basic Usage

<preview>
  <p-accordion>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</preview>

```vue
<template>
  <p-accordion>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</template>
```

### Multiple Open Item

<preview>
  <p-accordion :multiple="true">
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</preview>

```vue
<template>
  <p-accordion :multiple="true">
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</template>
```

### Disabled Item

<preview>
  <p-accordion>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2" disabled>
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</preview>

```vue
<template>
  <p-accordion>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2" disabled>
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</template>
```

### With Defined Items

<preview>
  <p-accordion :items="items" />
</preview>

```vue
<template>
  <p-accordion :items="items" />
</template>

<script setup>
import { defineAccordion } from '@privyid/persona/core'

const items = defineAccordion([
  {
    title  : 'Item Title 1',
    content: 'Content Item 1',
  },
  {
    title  : 'Item Title 2',
    content: 'Content Item 2',
  },
  {
    title   : 'Item Title 3',
    content : 'Content Item 3',
    disabled: true,
  },
  {
    title  : 'Item Title 4',
    content: 'Content Item 4',
  },
])
</script>
```

## Variant

### Pill Mode

<preview>
  <p-accordion pill>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</preview>

```vue
<template>
  <p-accordion pill>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</template>
```

### Flush Mode

<preview>
  <p-accordion flush>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</preview>

```vue
<template>
  <p-accordion flush>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 3">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</template>
```

## Hide Caret

Add props `no-caret` to hide caret icon. Add on `p-accordion` to hide globally, or add on `p-accordion-item` to hide spesific item.

<preview>
  <p-accordion no-caret>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</preview>

```vue
<template>
  <p-accordion no-caret>
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</template>
```

## Single Accordion Item

<preview>
  <p-accordion-item title="Item 1">
    <div class="p-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </div>
  </p-accordion-item>
</preview>

```vue
<template>
  <p-accordion-item title="Item 1">
    <div class="p-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </div>
  </p-accordion-item>
</template>
```

## Custom Caret

<preview>
  <p-accordion-item title="Item 1">
    <template #caret="{ expanded }">
      <CaretUp v-if="expanded" />
      <CaretDown v-else />
    </template>
    <div class="p-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </div>
  </p-accordion-item>
</preview>

```vue
<template>
  <p-accordion-item title="Item 1">
    <template #caret="{ expanded }">
      <CaretUp v-if="expanded" />
      <CaretDown v-else />
    </template>
    <div class="p-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </div>
  </p-accordion-item>
</template>
```

## Binding v-model

### v-model on `p-accordion`

<preview>
  <p-accordion v-model="active">
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</preview>

**Active :**

<pre><code>{{ active ?? '-' }}</code></pre>

```vue
<template>
  <p-accordion v-model="active">
    <p-accordion-item title="Item 1">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
    <p-accordion-item title="Item 2">
      <div class="p-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>
    </p-accordion-item>
  </p-accordion>
</template>

<script setup>
const active = ref('')
</script>
```

### v-model on `p-accordion-item`

<preview>
  <p-accordion-item
    v-model="expanded"
    title="Item 1">
    <div class="p-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </div>
  </p-accordion-item>
</preview>

**Expanded :**

<pre><code>{{ expanded }}</code></pre>

```vue
<template>
  <p-accordion-item
    v-model="expanded"
    title="Item 1">
    <div class="p-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </div>
  </p-accordion-item>
</template>
<script setup>
const expanded = ref(false)
</script>
```

## API

### Props `<p-accordion>`

| Props         |   Type    |  Default  | Description                                               |
|---------------|:---------:|:---------:|-----------------------------------------------------------|
| `flush`       | `Boolean` |  `false`  | Enable flush, accordion without container-border            |
| `pill`       | `Boolean` |  `false`  | Enable pill, accordion with space on each accordion item   |
| `multiple`   | `Boolean` |  `false`  | Allow expand multiple accordion item                       |
| `no-caret`   | `Boolean` |  `false`  | Hide caret icon                                            |
| `items`      | `Array`   |   `-`     | Accordion items                                            |
| `v-model`    | `String`  |   `-`     | ID of current expanded accordion item                      |

### Slots `<p-accordion>`

| Name             | Description                           |
|------------------|---------------------------------------|
| `default`        | Accordion content                     |

### Props `<p-accordion-item>`

| Props         |   Type    |  Default  | Description                                                  |
|---------------|:---------:|:---------:|--------------------------------------------------------------|
| `title`       | `String`  |     -     | Accordion Item Header Title                                  |
| `disabled`    | `Boolean` |  `false`  | Disable state of accordion item                              |
| `no-caret`    | `Boolean` |  `false`  | Hide caret icon                                              |
| `v-model`     | `Boolean` |  `false`  | v-model value for expand or collapse the accordion item      |

### Slots `<p-accordion-item>`

| Name             | Description                           |
|------------------|---------------------------------------|
| `default`        | Accordion item content                |
| `activator`      | Content to replace Item Activator     |
| `caret`          | Content to replace Caret Icon         |

### Events `<p-accordion-item>`

| Name       | Arguments | Description                         |
|------------|:---------:|-------------------------------------|
| `expand`   |     -     | Event when accordion item expanded  |
| `collapse` |     -     | Event when accordion item collapsed |
