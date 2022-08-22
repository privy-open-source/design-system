<script setup>
  import Table from './Table.vue'
  import Badge from '../badge/Badge.vue'
  import { defineTable } from './use-table'
  import { ref }from 'vue-demi'

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

# Table

## Usage

### Simple Usage

<preview class="flex-col gap-2">
  <Table :fields="fields" :items="items" />
</preview>

```vue
<template class="flex-col gap-2">
  <Table :fields="fields" :items="items" />
</template>

<script setup>
import { defineTable } from './use-table'

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

<preview class="flex-col gap-2">
  <Table :fields="fields2" :items="items" />
</preview>

```vue
<template class="flex-col gap-2">
  <Table :fields="fields" :items="items" />
</template>

<script setup>
import { defineTable } from './use-table'

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

## Variants

There are 2 variants: `flexible` and `static`, default is `flexible`

<preview class="flex-col gap-2">
  <Table variant="flexible" :fields="fields" :items="items" />
  <Table variant="static" :fields="fields" :items="items" />
</preview>

```vue
<template>
  <Table variant="flexible" :fields="fields" :items="items" />
  <Table variant="static" :fields="fields" :items="items" />
</template>
```
