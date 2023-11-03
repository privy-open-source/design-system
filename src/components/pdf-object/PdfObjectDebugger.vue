<template>
  <div
    ref="target"
    data-testid="pdf-debugger"
    class="pdf-object__debugger">
    <pre data-testid="debug-x">x: {{ x }}</pre>
    <pre data-testid="debug-y">y: {{ y }}</pre>
    <pre data-testid="debug-page">page: {{ page }}</pre>
    <pre data-testid="debug-width">width: {{ width }}</pre>
    <pre data-testid="debug-height">height: {{ height }}</pre>
  </div>
</template>

<script lang="ts">
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  offset,
} from '@floating-ui/dom'
import { templateRef } from '@vueuse/core'
import {
  defineComponent,
  inject,
  watchEffect,
} from 'vue-demi'
import { PDF_OBJECT_CONTEXT } from '.'

export default defineComponent({
  setup () {
    const {
      x,
      y,
      page,
      width,
      height,
    } = inject(PDF_OBJECT_CONTEXT)

    const target = templateRef<HTMLDivElement>('target')

    watchEffect((onCleanup) => {
      if (target.value) {
        const cleanup = autoUpdate(target.value.parentElement, target.value, () => {
          computePosition(target.value.parentElement, target.value, {
            strategy  : 'absolute',
            middleware: [autoPlacement(), offset(12)],
          }).then(({ x, y }) => {
            if (target.value) {
              target.value.style.left = `${x || 0}px`
              target.value.style.top  = `${y || 0}px`
            }
          })
        }, { animationFrame: true })

        onCleanup(cleanup)
      }
    }, { flush: 'post' })

    return {
      x,
      y,
      page,
      width,
      height,
    }
  },
})
</script>

<style lang="postcss">
.pdf-object {
  --p-pdf-debugger-size: 198px;

  &__debugger {
    @apply grid grid-cols-1 p-4 bg-inverse text-on-emphasis absolute rounded w-[var(--p-pdf-debugger-size)];
    /* @apply dark:bg-dark-inverse dark:text-dark-on-emphasis; */

    > pre {
      @apply truncate;
    }
  }
}
</style>
