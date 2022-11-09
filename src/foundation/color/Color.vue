<template>
  <div
    data-testid="color"
    class="color">
    <div class="space-y-1.5">
      <div
        class="color-box"
        :style="{'border' : color.border, 'background' : color.code }">
        <div
          class="color-overlay"
          :style="{'background' : color.overlay ? color.overlay : 'transparent' }" />
      </div>
      <div class="px-0.5">
        <div class="color-subtitle">
          <slot name="subtitle" />
        </div>
        <div class="color-code">
          <slot name="code" />
        </div>
      </div>
    </div>
    <div
      v-p-tooltip.focus
      title="Copied"
      class="color-copied"
      tabindex="0"
      @click="copy()" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue-demi'
import { useClipboard } from '@vueuse/core'
import { vPTooltip } from '../../directive'
const props    = defineProps({
  color: {
    type   : Object,
    default: () => ({}),
  },
})
const { copy } = useClipboard({ source: props.color.overlay || props.color.code })
</script>

<style lang="postcss" scoped>
.color {
  @apply w-full h-full relative cursor-pointer;

  &-box {
    @apply w-full h-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10;
  }

  &-subtitle {
    @apply text-xs tracking-tight dark:text-white;
  }

  &-code {
    @apply text-xs tracking-tight lowercase;
  }

  &-overlay {
    @apply rounded w-full h-10;
  }

  &-copied {
    @apply w-full h-full absolute top-0 left-0;
  }
}
</style>
