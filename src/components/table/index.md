---
title: Table · Components
description: Delightful datatables.
---

<script setup>
  import pTable from './Table.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import pLabel from '../label/Label.vue'
  import pHeading from '../heading/Heading.vue'
  import pText from '../text/Text.vue'
  import { defineTable } from '.'
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

# Table

> Delightful datatables.

## Usage

### Simple Usage

<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" variant="static" />
</preview>

<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" />
</preview>

<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" />
</preview>

```vue
<template class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" />
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
  <p-table :fields="fields2" :items="items" />
</preview>

```vue
<template class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" />
</template>

<script setup>
import { defineTable } from '@privyid/persona'

const fields = defineTable([
  {
    key  : 'id',
    label: 'PrivyID',
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

### Custom Empty Label
Empty state label customization can be done through the `empty-label` prop.
#### Default
<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="itemsC" />
</preview>

```vue
<template>
  <p-table :fields="fields" :items="items" />
</template>
```

#### Custom
<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="itemsC" empty-label="There’s nothing to show here" />
</preview>

```vue
<template>
  <p-table
    :fields="fields" :items="items"
    empty-label="There’s nothing to show here" />
</template>
```

## Variants

There are 2 variants: `flexible` and `static`, default is `flexible`

### Flexible

#### Default
<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table :fields="fields" :items="items" />
</template>
```

#### No Label
<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" no-label />
</preview>

```vue
<template>
  <p-table :fields="fields" :items="items" no-label />
</template>
```

#### Show Table Header
<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" no-label show-table-header />
</preview>

```vue
<template>
  <p-table 
    :fields="fields" 
    :items="items" 
    no-label 
    show-table-header />
</template>
```

### Static

<preview class="flex-col space-y-2">
  <p-table variant="static" :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table variant="static" :fields="fields" :items="items" />
</template>
```

## Selectable

Add prop `selectable` to enable checkbox inside table

<preview class="flex-col space-y-2">
  <p-table selectable :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table selectable :fields="fields" :items="items" />
</template>
```

### Binding v-model

The result of selected item is bind inside `v-model`

<preview class="flex-col space-y-2">
  <p-table v-model="selected" selectable :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table v-model="selected" selectable :fields="fields" :items="items" />
</template>
```

**Selected :**

<pre><code>{{ selected }}</code></pre>

### Disabling some item

set `_selectable` to `false` in your items to disabled item from selection.

<preview class="flex-col space-y-2">
  <p-table v-model="selectedA" selectable :fields="fields" :items="itemsB" />
</preview>

```vue
<template>
  <p-table v-model="selectedA" selectable :fields="fields" :items="items" />
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
  <p-table :fields="fields" v-model:items="items" draggable />
</preview>

```vue
<template>
  <p-table :fields="fields" v-model:items="items" draggable />
</template>
```
## Customization Slot

### Custom Cell

<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items">
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
  </p-table>
</preview>

```vue
<template>
  <p-table :fields="fields" :items="items">
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
  </p-table>
</template>
```

### Custom Head

<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items">
    <template #head(status)="{ label }">
      {{ label }}<p-label size="xs" class="ml-1">new</p-label>
    </template>
  </p-table>
</preview>

```vue
<template>
  <p-table :fields="fields" :items="items">
    <template #head(status)="{ label }">
      {{ label }}<p-label size="xs" class="ml-1">new</p-label>
    </template>
  </p-table>
</template>
```

### Custom Empty
Table has default empty state, but it's be able to customize by own via slot `empty`.

<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="itemsC">
    <template #empty>
      <div class="flex flex-col items-center justify-center">
        <img src="../../public/assets/images/img-table-empty-records.svg">
        <p-heading element="h6" class="mt-12">Uh oh, no data</p-heading>
        <p-text variant="body2" class="py-4 text-subtle dark:text-dark-subtle">We’re empty-handed!</p-text>
      </div>
    </template>
  </p-table>
</preview>

```vue
<template>
  <p-table :fields="fields" :items="items">
    <template #empty>
      <div class="flex flex-col items-center justify-center">
        <img src="/assets/images/img-table-empty-records.svg">
        <p-heading element="h6" class="mt-12">Uh oh, no data</p-heading>
        <p-text variant="body2" class="py-4 text-subtle dark:text-dark-subtle">
          We’re empty-handed!
        </p-text>
      </div>
    </template>
  </p-table>
</template>
```

## Variables
Table use local CSS variables on `.datatable` for enhanced real-time customization.

```sass
--p-table-bg: theme(backgroundColor.default.DEFAULT);
--p-table-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
--p-table-border: theme(borderColor.default.DEFAULT);
--p-table-border-dark: theme(borderColor.dark.default.DEFAULT);
```
### Example
It's possible to custom table flexible background, but the border must be transparent or same as the background color.
<preview class="flex-col space-y-2">
  <p-table :fields="fields" :items="items" style="--p-table-bg: #F3F3F3;--p-table-bg-dark: #0D1117;--p-table-border: #F3F3F3; --p-table-border-dark: #0D1117;" />
</preview>

```vue
<template>
  <p-table 
    :fields="fields" 
    :items="items" 
    style="--p-table-bg: #F3F3F3;
    --p-table-bg-dark: #0D1117;
    --p-table-border: #F3F3F3; 
    --p-table-border-dark: #0D1117;" />
</template>
```


## API

### Props

| Props         |   Type    |  Default   | Description                                              |
|---------------|:---------:|:----------:|----------------------------------------------------------|
| `variant`     | `String`  | `flexible` | Table style variant, valid value is `flexible`, `static` |
| `items`       |  `Array`  |    `-`     | Table items                                              |
| `fields`      |  `Array`  |    `-`     | Table fields                                             |
| `selectable`  | `Boolean` |  `false`   | Enable checkbox                                          |
| `draggable`   | `Boolean` |  `false`   | Enable draggable                                         |
| `v-model`     |  `Array`  |    `-`     | `v-model` for selected value                             |
| `empty-label` | `String`  |  `There are no records to show`   | Table empty state label           |
| `no-label`    | `Boolean` |  `false`   | Hide label in `flexible` variant                         |
| `show-table-header`    | `Boolean` |  `false`   | Show table header in `flexible` variant         |

In props `fields` contain

| Props       | Type             | Description                                                                  |
|-------------|:----------------:|------------------------------------------------------------------------------|
| `key`       | `String`         | Field's key                                                                  |
| `label?`     | `String`         | Field's Label                                                               |
| `width?`     | `Number`         | Field's width in percent                                                    |
| `formatter?` | `Function`       | Field's formatter, it receives `value` and `item` params and returning string value  |
| `thClass?`   | `HTMLAttributes` | `HTMLAttributes` of `class` to use in table column cell                     |
| `tdClass?`   | `HTMLAttributes` | `HTMLAttributes` of `class` to use in table head cell                       |


### Slots

| Name         | Description                 |
|--------------|-----------------------------|
| `cell(:key)` | Content for checked label   |
| `head(:key)` | Content for unchecked label |
| `empty`      | Content for empty state     |

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
