<template>
  <div
    data-testid="color"
    class="space-y-1.5 color">
    <div
      class="w-full h-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10"
      :style="{'background' : color.code, 'border' : color.border }" />
    <div class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0">
      <div class="w-16 text-xs tracking-tight 2xl:w-full dark:text-white">
        <slot name="subtitle" />
      </div>
      <div class="font-mono text-xs tracking-tight lowercase">
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
