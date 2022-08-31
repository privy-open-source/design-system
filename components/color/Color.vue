<template>
  <div
    data-testid="color"
    class="space-y-1.5 color">
    <div
      class="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10"
      :style="{'background' : color.code, 'border' : color.border ? color.border : ''}" />
    <div class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0">
      <div class="w-16 text-xs 2xl:w-full dark:text-white tracking-tight">
        <slot name="subtitle" />
      </div>
      <div class="text-xs font-mono lowercase tracking-tight">
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
