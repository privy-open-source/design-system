<template>
  <slot />
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import type { TravelHook } from '../steps'

defineOptions({ name: 'WizardStep' })

defineProps({
  title: {
    type   : String,
    default: '',
  },
  onBeforePrev: {
    type   : Function as PropType<TravelHook>,
    default: undefined,
  },
  onBeforeNext: {
    type   : Function as PropType<TravelHook>,
    default: undefined,
  },
})

defineSlots<{
  'icon'(): VNode[],
  'title'(): VNode[],
  'default'(): VNode[],
}>()
</script>
