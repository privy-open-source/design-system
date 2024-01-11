<template>
  <div
    class="progress__item"
    data-testid="progress-item"
    :class="classNames">
    <div class="progress__content">
      <div class="progress__bar" />
      <div class="progress__point">
        <slot name="icon">
          <div
            data-testid="progress-point-item"
            class="progress__point-item" />
        </slot>
      </div>
      <div
        data-testid="progress-title"
        class="progress__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue-demi'
import { computed } from 'vue-demi'

defineOptions({ name: 'ProgressItem' })

const props = defineProps({
  title: {
    type   : String,
    default: '',
  },
  active: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: string[] = []

  if (props.active)
    result.push('progress--active')

  return result
})

defineSlots<{
  'icon'(): VNode[],
  'title'(): VNode[],
}>()
</script>
