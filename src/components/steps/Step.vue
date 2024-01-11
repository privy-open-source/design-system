<template>
  <div
    class="step"
    data-testid="step">
    <slot
      :step="step"
      :next="next"
      :prev="prev"
      :total="total"
      :can-prev="canPrev"
      :can-next="canNext"
      :to-step="toStep" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import type { TravelHook } from '.'
import { useStep } from '.'

defineOptions({ name: 'Step' })

const props = defineProps({
  onBeforePrev: {
    type   : Function as PropType<TravelHook>,
    default: () => true,
  },
  onBeforeNext: {
    type   : Function as PropType<TravelHook>,
    default: () => true,
  },
})

const {
  canNext,
  canPrev,
  toStep,
  step,
  total,
  next,
  prev,
  onBeforeNext: addOnBeforeNext,
  onBeforePrev: addOnBeforePrev,
} = useStep()

// Registering Hooks
addOnBeforeNext(props.onBeforeNext)
addOnBeforePrev(props.onBeforePrev)
</script>
