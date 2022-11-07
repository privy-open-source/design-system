<template>
  <div
    data-testid="color"
    class="space-y-1.5 color">
    <div
      class="w-full h-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10"
      :style="{'border' : color.border, 'background' : color.code }">
      <div
        v-if="color.overlay"
        class="rounded w-full h-10"
        :style="{'background' : color.overlay }" />
    </div>
    <div class="px-0.5">
      <div class="text-xs tracking-tight dark:text-white">
        <slot name="subtitle" />
      </div>
      <div class="font-mono text-xs tracking-tight">
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    color: {
      type   : Object,
      default: () => ({}),
    },
  },
})
</script>
