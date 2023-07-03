---
title: Filterbar · Components
description: Add filter to your datatable easy-way.
---

<script setup>
  import { ref, computed } from 'vue-demi'
  import pFilterbar from './Filterbar.vue'
  import { defineFilter } from '.'

  const query = ref({})

  const status = computed(() => {
    return query.value.is_active
      ? ['Draft', 'Pending', 'Completed']
      : ['Inactive']
  })

  const schema = defineFilter([
    {
      type: 'toggle',
      key : 'is_active',
    },
    {
      type: 'date',
      key : 'created_at',
    },
        {
      type   : 'select',
      key    : 'location',
      options: [
        'Jakarta',
        'Bandung',
        'Yogyakarta',
      ],
    },
    {
      type   : 'multiselect',
      key    : 'status',
      options: status,
    },
  ])

  const toggleOnly = defineFilter([
    {
      type: 'toggle',
      key : 'is_active',
    },
  ])

  const selectOnly = defineFilter([
    {
      type   : 'select',
      key    : 'location',
      options: [
        'Jakarta',
        'Bandung',
        'Yogyakarta',
      ],
    },
  ])

  const multiselectOnly = defineFilter([
    {
      type   : 'multiselect',
      key    : 'status',
      options: status,
    },
  ])
</script>

# Filterbar

> Add filter to your datatable easy-way.

## Usage

### Simple Usage

<preview>
  <p-filterbar :schema="schema" v-model="query" />
</preview>

```vue
<template>
  <p-filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from '@privyid/persona/core'

const query  = ref({})
const schema = defineFilter([
  {
    type: 'toggle',
    key : 'is_active',
  },
  {
    type: 'date',
    key : 'created_at',
  },
  {
    type   : 'select',
    key    : 'status',
    options: [
      'Draft',
      'Pending',
      'Completed',
    ],
  },
])
</script>
```

## Types

### Toggle

<preview>
  <p-filterbar :schema="toggleOnly" v-model="query" />
</preview>

```vue
<template>
  <p-filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from '@privyid/persona/core'

const schema = defineFilter([
  {
    type: 'toggle',
    key : 'is_active',
  },
])
</script>
```

### Select

<preview>
  <p-filterbar :schema="selectOnly" v-model="query" />
</preview>

```vue
<template>
  <p-filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from '@privyid/persona/core'

const schema = defineFilter([
  {
    type   : 'select',
    key    : 'location',
    options: [
      'Jakarta',
      'Bandung',
      'Yogyakarta',
    ],
  },
])
</script>
```

### Multiselect

<preview>
  <p-filterbar :schema="multiselectOnly" v-model="query" />
</preview>

```vue
<template>
  <p-filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from '@privyid/persona/core'

const schema = defineFilter([
  {
    type   : 'multiselect',
    key    : 'status',
    options: [
      'Draft',
      'Pending',
      'Completed',
    ],
  },
])
</script>
```
