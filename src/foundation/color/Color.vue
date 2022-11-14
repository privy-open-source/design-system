<template>
  <div
    data-testid="color"
    class="color">
    <div class="space-y-1.5">
      <div
        class="color-box"
        :style="{'border' : color.border, 'background' : color.code }">
        <div
          v-if="color.overlay"
          class="color-overlay"
          :style="{'background' : color.overlay }" />
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

<script lang="ts" setup>
import {
  computed,
  defineProps,
  PropType,
} from 'vue-demi'
import { useClipboard } from '@vueuse/core'
import { vPTooltip } from '../../components/tooltip'
import type { Color } from '.'

const props = defineProps({
  color: {
    type   : Object as PropType<Color>,
    default: () => ({} as Color),
  },
})

const source   = computed(() => props.color.overlay || props.color.code)
const { copy } = useClipboard({ source })
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
