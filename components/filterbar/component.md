<script setup>
  import { ref } from 'vue-demi'
  import Filterbar from './Filterbar.vue'
  import { defineFilter } from './use-filterbar'

  const query = ref({})

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
      type   : 'multiselect',
      key    : 'status',
      options: [
        'Draft',
        'Pending',
        'Completed',
      ],
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
      options: [
        'Draft',
        'Pending',
        'Completed',
      ],
    },
  ])
</script>

# Filterbar

## Usage

### Simple Usage
<preview>
  <Filterbar :schema="schema" v-model="query" />
</preview>

```vue
<template>
  <Filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from './use-filterbar'

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

### `toggle`

<preview>
  <Filterbar :schema="toggleOnly" v-model="query" />
</preview>

```vue
<template>
  <Filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from './use-filterbar'

const schema = defineFilter([
  {
    type: 'toggle',
    key : 'is_active',
  },
])
</script>
```

### `select`

<preview>
  <Filterbar :schema="selectOnly" v-model="query" />
</preview>

```vue
<template>
  <Filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from './use-filterbar'

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

### `multiselect`

<preview>
  <Filterbar :schema="multiselectOnly" v-model="query" />
</preview>

```vue
<template>
  <Filterbar :schema="schema" v-model="query" />
</template>

<script setup>
import { defineFilter } from './use-filterbar'

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
