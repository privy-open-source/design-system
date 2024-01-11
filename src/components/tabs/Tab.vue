<template>
  <section
    data-testid="tab-panel"
    class="tab__panel">
    <div
      data-testid="tab-content"
      class="tab__content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue-demi'

defineProps({
  title: {
    type   : String,
    default: '',
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
})

defineOptions({ name: 'Tab' })

defineSlots<{
  'title'(): VNode[],
  'icon'(): VNode[],
  'default'(): VNode[],
}>()
</script>
