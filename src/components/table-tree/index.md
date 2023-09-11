---
title: Table Tree · Components
description: Draggable Table Tree.
---

<script setup>
  import pTableTree from './TableTree.vue'
  import { defineTable } from '../table'
  import { ref } from 'vue-demi'

  const fields = defineTable([
    'id',
    'name',
    'status',
  ])

  const items = ref([
    {
      id      : 1,
      name    : 'Tarjono',
      status  : true,
      children: [
        {
          id      : 2,
          name    : 'Renatta',
          status  : false,
          children: [
            {
              id      : 3,
              name    : 'Jonathan Smith',
              status  : true,
              children: [],
            },
            {
              id      : 4,
              name    : 'Arch Brown',
              status  : true,
              children: [],
            },
          ]
        },
      ]
    },
  ])
</script>

# Table Tree

> Draggable Table Tree

## Usage

<preview>
  <p-table-tree
    v-model:items="items"
    :fields="fields"
    child-key="children">
    <template #append="{ item }">
      <a href="#" @click.prevent>Add position below <b>{{ item.name }}</b></a>
    </template>
  </p-table-tree>
</preview>

<pre>{{ items }}</pre>
