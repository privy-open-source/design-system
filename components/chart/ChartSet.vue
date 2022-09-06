<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name : 'ChartSet',
  props: {
    name: {
      type    : String,
      required: true,
    },
  },
})
</script>
