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
import { STEPS_CONTEXT } from './use-steps'
import { noop, clamp } from 'lodash-es'

export default defineComponent({
  components: { StepSlider },
  props     : {
    modelValue: {
      type   : Number,
      default: 1,
    },
    onBeforeNext: {
      type   : Function as PropType<(to: number, from: number) => number | Promise<number>>,
      default: () => noop,
    },
    onFinished: {
      type   : Function as PropType<() => void | Promise<void>>,
      default: () => noop,
    },
  },
  setup (props, { slots }) {
    const model = useVModel(props)

    const total = computed(() => {
      return findAllChildren(slots.default(), 'Step').length
    })

    const canNext = computed(() => {
      return model.value <= total.value
    })

    const canPrev = computed(() => {
      return model.value > 1
    })

    async function next () {
      const from = model.value
      const to   = model.value + 1

      if (canNext.value && await props.onBeforeNext(to, from)) {
        if (to <= total.value)
          model.value = to
        else
          await props.onFinished()
      }
    }

    async function prev () {
      if (canPrev.value)
        model.value--
    }

    function toStep (step: number) {
      model.value = clamp(step, 1, total.value)
    }

    provide(STEPS_CONTEXT, {
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
