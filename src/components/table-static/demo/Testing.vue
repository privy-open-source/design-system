<script lang="ts" setup>
import { defineTable } from '../../table'
import Table from '../../table-flex/TableFlex.vue'

const fields = defineTable([
  { key: 'action', label: '#' },
  { key: 'name' },
  { key: 'privyId' },
])
</script>

<template>
  <Table :fields="fields">
    <template #cell(action)="scope">
      {{ scope.item.action }}
    </template>
    <template #head(action)="scope">
      {{ scope.field.label }}
    </template>
  </Table>
</template>
