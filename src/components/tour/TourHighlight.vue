<template>
  <div class="tour__backdrop">
    <div
      ref="highlight"
      class="tour__highlight"
      v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  ref,
  toRef,
  watchEffect,
} from 'vue-demi'
import { autoUpdate } from '@floating-ui/dom'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  target: {
    type   : Object as PropType<HTMLElement>,
    default: undefined,
  },
})

const target    = toRef(props, 'target')
const highlight = ref<HTMLDivElement>()

watchEffect((onCleanup) => {
  if (highlight.value && target.value) {
    const cleanup = autoUpdate(target.value, highlight.value, () => {
      const bounding = target.value.getBoundingClientRect()
      const padding  = 16

      highlight.value.style.width  = `${bounding.width + padding}px`
      highlight.value.style.height = `${bounding.height + padding}px`
      highlight.value.style.left   = `${bounding.left - padding / 2}px`
      highlight.value.style.top    = `${bounding.top - padding / 2}px`
    }, { animationFrame: true })

    onCleanup(cleanup)
  }
})
</script>

<style lang="postcss">
.tour {
  &__backdrop {
    @apply fixed inset-0 overflow-hidden w-full h-full z-[var(--p-tour-backdrop-z-index)];
  }

  &__highlight {
    @apply z-[var(--p-tour-z-index)] absolute shadow-mask cursor-pointer rounded-tn;
  }
}
</style>
