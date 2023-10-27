<template>
  <template v-if="scrollable">
    <div
      class="table-static"
      v-bind="$attrs">
      <table
        class="table-static__table"
        :class="tableClass">
        <slot />
      </table>
    </div>
  </template>
  <template v-else>
    <table
      class="table-static__table"
      :class="tableClass"
      v-bind="$attrs">
      <slot />
    </table>
  </template>
</template>

<script lang="ts" setup>
import type { HTMLAttributes, PropType } from 'vue-demi'

defineOptions({ inheritAttrs: false })

defineProps({
  scrollable: {
    type   : Boolean,
    default: true,
  },
  tableClass: {
    type: [
      String,
      Array,
      Object,
    ] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
})
</script>
