<template>
  <div
    ref="target"
    class="pdf-object__debugger">
    <pre>x: {{ x }}</pre>
    <pre>y: {{ y }}</pre>
    <pre>page: {{ page }}</pre>
    <pre>width: {{ width }}</pre>
    <pre>height: {{ height }}</pre>
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
        })

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
  &__debugger {
    @apply grid grid-cols-1 p-4 bg-emphasis text-on-emphasis absolute rounded w-[198px];

    > pre {
      @apply truncate;
    }
  }
}
</style>
