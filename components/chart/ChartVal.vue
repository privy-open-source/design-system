<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name : 'ChartVal',
  props: {
    name: {
      type    : [String, Number],
      required: true,
    },
    value: {
      type    : [String, Number],
      required: true,
    },
    color: {
      type   : String,
      default: undefined,
    },
  },
})
</script>
