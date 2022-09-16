<template>
  <div
    class="steps"
    data-testid="steps">
    <StepSlider :active="model - 1">
      <slot />
    </StepSlider>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
} from 'vue-demi'
import StepSlider from './StepSlider.vue'
import { useVModel } from '../input/use-input'
import { findAllChildren } from '../utils/vnode'
import {
  STEPS_CONTEXT,
  TravelHook,
  FinishedHook,
  runHook,
} from './use-steps'
import { noop } from 'lodash-es'
import { syncRef, useClamp } from '@vueuse/core'

export default defineComponent({
  components: { StepSlider },
  props     : {
    modelValue: {
      type   : Number,
      default: 1,
    },
    onBeforePrev: {
      type   : Function as PropType<TravelHook>,
      default: () => noop,
    },
    onBeforeNext: {
      type   : Function as PropType<TravelHook>,
      default: () => noop,
    },
    onFinished: {
      type   : Function as PropType<FinishedHook>,
      default: () => noop,
    },
  },
  setup (props, { slots }) {
    const model = useVModel(props)

    const total = computed(() => {
      return findAllChildren(slots.default(), 'Step').length
    })

    const step = useClamp(model, 1, total)

    const canNext = computed(() => {
      return model.value <= total.value
    })

    const canPrev = computed(() => {
      return model.value > 1
    })

    async function next () {
      const from = model.value
      const to   = model.value + 1

      if (canNext.value && await runHook(props.onBeforeNext, to, from)) {
        if (to <= total.value)
          step.value = to
        else
          await props.onFinished()
      }
    }

    async function prev () {
      const from = model.value
      const to   = model.value - 1

      if (canPrev.value && await runHook(props.onBeforePrev, to, from))
        step.value = to
    }

    function toStep (to: number) {
      step.value = to
    }

    syncRef(step, model)

    provide(STEPS_CONTEXT, {
      step,
      next,
      prev,
      canNext,
      canPrev,
      toStep,
    })

    return { model }
  },
})
</script>

<style lang="postcss">
  .steps {
    @apply w-full;
  }
</style>
