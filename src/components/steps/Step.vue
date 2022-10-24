<template>
  <div
    class="step"
    data-testid="step">
    <slot
      :step="step"
      :next="next"
      :prev="prev"
      :can-prev="canPrev"
      :can-next="canNext"
      :to-step="toStep" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from 'vue-demi'
import { useStep } from '.'
import { TravelHook } from './utils/hook'

export default defineComponent({
  name : 'Step',
  props: {
    onBeforePrev: {
      type   : Function as PropType<TravelHook>,
      default: () => true,
    },
    onBeforeNext: {
      type   : Function as PropType<TravelHook>,
      default: () => true,
    },
  },
  setup (props) {
    const {
      canNext,
      canPrev,
      toStep,
      step,
      next,
      prev,
      onBeforeNext,
      onBeforePrev,
    } = useStep()

    // Registering Hooks
    onBeforeNext(props.onBeforeNext)
    onBeforePrev(props.onBeforePrev)

    return {
      canNext,
      canPrev,
      toStep,
      prev,
      next,
      step,
    }
  },
})
</script>
