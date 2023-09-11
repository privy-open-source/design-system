---
title: Table Flex · Components
description: Table but using flexbox.
---

<script setup>
  import pTableFlex from './TableFlex.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import pLabel from '../label/Label.vue'
  import pHeading from '../heading/Heading.vue'
  import pText from '../text/Text.vue'
  import pButton from '../button/Button.vue'
  import PiTrash16 from '@privyid/persona-icon/vue/trash/16.vue'
  import { defineTable } from '../table'
  import { ref } from 'vue-demi'

  const fields = defineTable([
    'id',
    'name',
    'status',
  ])

  const fields2 = defineTable([
    {
      key  : 'id',
      label: 'PrivyID',
      width: '15%',
    },
    {
      key  : 'name',
      label: 'Name',
    },
    {
      key      : 'status',
      label    : 'Is Active',
      formatter: (value) => value ? 'Active': 'Deactive',
    },
  ])

  const items = ref([
    {
      id    : 1,
      name  : 'Tarjono',
      status: true,
    },
    {
      id    : 2,
      name  : 'Renatta',
      status: false,
    },
    {
      id    : 3,
      name  : 'Jonathan Smith',
      status: true,
    },
    {
      id    : 4,
      name  : 'Arch Brown',
      status: true,
    },
  ])

  const itemsB = ref([
    {
      id    : 1,
      name  : 'Tarjono',
      status: true,
    },
    {
      id    : 2,
      name  : 'Tarjono',
      status: false,
    },
    {
      id    : 3,
      name  : 'Tarjono',
      status: true,
    },
    {
      id         : 4,
      name       : 'Can\'t be selected',
      status     : true,
      _selectable: false,
    },
  ])

  const itemsC = ref([])

  const selected = ref([])
  const selectedA = ref([])
</script>

<style lang="postcss">
  .vp-doc .preview {
    table {
      @apply table my-0;
    }

    thead tr {
      @apply border-t-0;
    }
  }
</style>

# Table Flex

> Table but using Flexbox.

## Usage

### Simple Usage

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items" />
</preview>

```vue
<template class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items" />
</template>

<script setup>
import { defineTable } from '@privyid/persona/core'

const fields = defineTable([
  'id',
  'name',
  'status',
])

const items = ref([
  {
    id    : 1,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 2,
    name  : 'Tarjono',
    status: false,
  },
  {
    id    : 3,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 4,
    name  : 'Tarjono',
    status: true,
  },
])
</script>
```

### Custom Label + Formatter

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields2" :items="items" />
</preview>

```vue
<template class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items" />
</template>

<script setup>
import { defineTable } from '@privyid/persona'

const fields = defineTable([
  {
    key  : 'id',
    label: 'PrivyID',
    width: '15%',
  },
  {
    key  : 'name',
    label: 'Name',
  },
  {
    key      : 'status',
    label    : 'Is Active',
    formatter: (value) => value ? 'Active': 'Deactive',
  },
])

const items = ref([
  {
    id    : 1,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 2,
    name  : 'Tarjono',
    status: false,
  },
  {
    id    : 3,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 4,
    name  : 'Tarjono',
    status: true,
  },
])
</script>
```

## Apperance

There are 2 variants: `table` and `card`, default is `card`

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items" apperance="table" />
</preview>

```vue
<template>
  <p-table-flex :fields="fields" :items="items" apperance="table" />
</template>
```

## Hide Label Header

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items" no-label />
</preview>

```vue
<template>
  <p-table-flex :fields="fields" :items="items" no-label />
</template>
```

## Selectable

Add prop `selectable` to enable checkbox inside table

<preview class="flex-col space-y-2">
  <p-table-flex selectable :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table-flex selectable :fields="fields" :items="items" />
</template>
```

### Binding v-model

The result of selected item is bind inside `v-model`

<preview class="flex-col space-y-2">
  <p-table-flex v-model="selected" selectable :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table-flex v-model="selected" selectable :fields="fields" :items="items" />
</template>
```

**Selected :**

<pre><code>{{ selected }}</code></pre>

### Disabling some item

set `_selectable` to `false` in your items to disabled item from selection.

<preview class="flex-col space-y-2">
  <p-table-flex v-model="selectedA" selectable :fields="fields" :items="itemsB" />
</preview>

```vue
<template>
  <p-table-flex v-model="selectedA" selectable :fields="fields" :items="items" />
</template>

<script setup>
  const items = ref([
    {
      id    : 1,
      name  : 'Tarjono',
      status: true,
    },
    {
      id    : 2,
      name  : 'Tarjono',
      status: false,
    },
    {
      id    : 3,
      name  : 'Tarjono',
      status: true,
    },
    {
      id         : 4,
      name       : 'Can\'t be selected',
      status     : true,
      _selectable: false,
    },
  ])
</script>
```

## Draggable

add prop `draggable` to enable drag-to-sort.

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" v-model:items="items" draggable />
</preview>

```vue
<template>
  <p-table-flex :fields="fields" v-model:items="items" draggable />
</template>
```

## Customization Slot

### Custom Cell

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items">
    <template #cell(name)="{ item }">
      <div class="flex items-center space-x-2">
        <p-avatar size="sm" :name="item.name" />
        <span>{{ item.name }}</span>
      </div>
    </template>
    <template #cell(status)="{ item }">
      <p-label variant="light" :color="item.status ? 'success' : 'default'" size="sm">
        {{ item.status ? 'active' : 'inactive' }}
      </p-label>
    </template>
  </p-table-flex>
</preview>

```vue
<template>
  <p-table-flex :fields="fields" :items="items">
    <template #cell(name)="{ item }">
      <div class="flex items-center space-x-2">
        <p-avatar size="sm" :name="item.name" />
        <span>{{ item.name }}</span>
      </div>
    </template>
    <template #cell(status)="{ item }">
      <p-label
        variant="light" :color="item.status ? 'success' : 'default'"
        size="sm">
        {{ item.status ? 'active' : 'inactive' }}
      </p-label>
    </template>
  </p-table-flex>
</template>
```

### Custom Head

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items">
    <template #head(status)="{ label }">
      {{ label }}<p-label size="xs" class="ml-1">new</p-label>
    </template>
  </p-table-flex>
</preview>

```vue
<template>
  <p-table-flex :fields="fields" :items="items">
    <template #head(status)="{ label }">
      {{ label }}<p-label size="xs" class="ml-1">new</p-label>
    </template>
  </p-table-flex>
</template>
```

### Custom Row

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="items" draggable>
    <template #row="{ item }">
      <div class="flex items-center flex-grow p-4 space-x-4 max-sm:w-full">
        <p-avatar size="sm" :name="item.name" />
        <div class="flex flex-col items-start flex-grow">
          <span>{{ item.name }}</span>
          <p-label color="danger" variant="light" size="sm">Sign</p-label>
        </div>
        <p-button variant="ghost" icon>
          <pi-trash-16 />
        </p-button>
      </div>
    </template>
  </p-table-flex>
</preview>

```vue
<template>
  <p-table-flex :fields="fields" :items="items" draggable>
    <template #row="{ item }">
      <div class="flex items-center flex-grow p-4 space-x-4 max-sm:w-full">
        <p-avatar size="sm" :name="item.name" />
        <div class="flex flex-col items-start flex-grow">
          <span>{{ item.name }}</span>
          <p-label color="danger" variant="light" size="sm">Sign</p-label>
        </div>
        <p-button variant="ghost" icon>
          <pi-trash-16 />
        </p-button>
      </div>
    </template>
  </p-table-flex>
</template>
```

### Custom Empty

Table has default empty state, but it's be able to customize by own via slot `empty`.

<preview class="flex-col space-y-2">
  <p-table-flex :fields="fields" :items="itemsC">
    <template #empty>
      <div class="flex flex-col items-center justify-center">
        <img src="/assets/images/img-table-empty-records.svg">
        <p-heading element="h6" class="mt-12">Uh oh, no data</p-heading>
        <p-text variant="body2" class="py-4 text-subtle dark:text-dark-subtle">We're empty-handed!</p-text>
      </div>
    </template>
  </p-table-flex>
</preview>

```vue
<template>
  <p-table-flex :fields="fields" :items="items">
    <template #empty>
      <div class="flex flex-col items-center justify-center">
        <img src="/assets/images/img-table-empty-records.svg">
        <p-heading element="h6" class="mt-12">Uh oh, no data</p-heading>
        <p-text variant="body2" class="py-4 text-subtle dark:text-dark-subtle">
          We're empty-handed!
        </p-text>
      </div>
    </template>
  </p-table-flex>
</template>
```

## Variables

Table use local CSS variables for enhanced real-time customization.

```sass
--p-table-bg: theme(backgroundColor.default.DEFAULT);
--p-table-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
--p-table-border: theme(borderColor.default.DEFAULT);
--p-table-border-dark: theme(borderColor.dark.default.DEFAULT);
```

### Example

<preview class="flex-col space-y-2">
  <p-table-flex
    :fields="fields"
    :items="items"
    style="
      --p-table-header-bg: #F3F3F3;
      --p-table-header-bg-dark: #0D1117;
    " />
</preview>

```vue
<template>
  <p-table-flex
    :fields="fields"
    :items="items"
    style="
      --p-table-header-bg: #F3F3F3;
      --p-table-header-bg-dark: #0D1117;
    " />
</template>
```


## API

### Props

| Props         |   Type    |            Default             | Description                                             |
|---------------|:---------:|:------------------------------:|---------------------------------------------------------|
| `apperance`   | `String`  |            `table`             | Table apperance variant, valid value is `table`, `card` |
| `items`       |  `Array`  |              `-`               | Table items                                             |
| `fields`      |  `Array`  |              `-`               | Table fields                                            |
| `selectable`  | `Boolean` |            `false`             | Enable checkbox                                         |
| `draggable`   | `Boolean` |            `false`             | Enable draggable                                        |
| `v-model`     |  `Array`  |              `-`               | `v-model` for selected value                            |
| `empty-label` | `String`  | `There are no records to show` | Table empty state label                                 |
| `no-label`    | `Boolean` |            `false`             | Hide headerlabel                                        |
| `table-class` | `String`  |              `-`               | Add class to table element                              |
| `tr-class`    | `String`  |              `-`               | Add class to table row element                          |

In props `fields` contain

| Props        |       Type       | Description                                                                         |
|--------------|:----------------:|-------------------------------------------------------------------------------------|
| `key`        |     `String`     | Field's key                                                                         |
| `label?`     |     `String`     | Field's Label                                                                       |
| `width?`     |     `Number`     | Field's width in percent                                                            |
| `formatter?` |    `Function`    | Field's formatter, it receives `value` and `item` params and returning string value |
| `thClass?`   | `HTMLAttributes` | `HTMLAttributes` of `class` to use in table column cell                             |
| `tdClass?`   | `HTMLAttributes` | `HTMLAttributes` of `class` to use in table head cell                               |


### Slots

| Name         | Description                 |
|--------------|-----------------------------|
| `cell(:key)` | Content for checked label   |
| `head(:key)` | Content for unchecked label |
| `empty`      | Content for empty state     |
| `row`        | Custom render for row       |

### Events

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

## See Also

- [Table Static](../table-static/)
- [Table (deprecated)](../table/)
