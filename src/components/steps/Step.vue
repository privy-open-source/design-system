<template>
  <div class="step">
    <slot
      :next="next"
      :prev="prev"
      :can-prev="canPrev"
      :can-next="canNext"
      :to-step="toStep" />
  </div>
</template>

<script lang="ts">
import { noop } from 'lodash-es'
import { defineComponent, PropType } from 'vue-demi'
import {
  runHook,
  TravelHook,
  useStep,
} from './use-steps'

export default defineComponent({
  name : 'Step',
  props: {
    onBeforePrev: {
      type   : Function as PropType<TravelHook>,
      default: () => noop,
    },
    onBeforeNext: {
      type   : Function as PropType<TravelHook>,
      default: () => noop,
    },
  },
  setup (props) {
    const {
      canNext,
      canPrev,
      toStep,
      step,
      next: goNext,
      prev: goPrev,
    } = useStep()

    async function next () {
      const from = step.value
      const to   = step.value + 1

      if (await runHook(props.onBeforeNext, to, from))
        goNext()
    }

    async function prev () {
      const from = step.value
      const to   = step.value - 1

      if (await runHook(props.onBeforePrev, to, from))
        goPrev()
    }

    return {
      canNext,
      canPrev,
      toStep,
      prev,
      next,
    }
  },
})
</script>
