<template>
  <slot />
</template>

<script lang="ts" setup>
import type { ChartDataset } from 'chart.js/auto'
import type { PropType } from 'vue-demi'

defineOptions({
  name        : 'ChartSet',
  inheritAttrs: false,
})

defineProps({
  name: {
    type    : [String, Number],
    required: true,
  },
  color: {
    type   : String,
    default: undefined,
  },
  fill: {
    type   : String,
    default: undefined,
  },
  options: {
    type   : Object as PropType<ChartDataset>,
    default: undefined,
  },
})
</script>
