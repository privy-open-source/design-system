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
          data-testid="color-overlay"
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
      v-p-tooltip.focus="copied"
      title="Copied"
      class="color-copied"
      data-testid="color-copy"
      tabindex="0"
      @click="copy()" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { useClipboard } from '@vueuse/core'
import { pTooltip } from '../../components/tooltip'
import type { Color } from '.'

export default defineComponent({
  directives: { pTooltip },
  props     : {
    color: {
      type   : Object as PropType<Color>,
      default: () => ({} as Color),
    },
  },
  setup (props) {
    const source           = computed(() => props.color.overlay || props.color.code)
    const { copy, copied } = useClipboard({ source })

    return { copy, copied }
  },
})
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
    @apply w-full h-full absolute inset-0;
  }
}
</style>
