<template>
  <div
    :active="active"
    class="table-static__header-sort"
    data-testid="table-static-header-sort">
    <IconUp
      class="table-static__header-sort-up" />
    <IconDown
      class="table-static__header-sort-down" />
  </div>
</template>

<script lang="ts" setup>
import IconUp from '@privyid/persona-icon/vue/caret-up/16.vue'
import IconDown from '@privyid/persona-icon/vue/caret-down/16.vue'

defineProps({
  active: {
    type   : String,
    default: undefined,
  },
})
</script>
