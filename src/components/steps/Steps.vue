<template>
  <div
    class="steps"
    data-testid="steps">
    <StepSlider
      :active="model - 1"
      :keep-alive="keepAlive">
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
  ref,
} from 'vue-demi'
import StepSlider from './StepSlider.vue'
import { useVModel } from '../input/use-input'
import { findAllChildren } from '../utils/vnode'
import { STEPS_CONTEXT } from './use-steps'
import { syncRef, useClamp } from '@vueuse/core'
import {
  TravelHook,
  FinishedHook,
  runAllHooks,
} from './utils/hook'
import { noop } from 'lodash-es'

export default defineComponent({
  components: { StepSlider },
  props     : {
    modelValue: {
      type   : Number,
      default: 1,
    },
    keepAlive: {
      type   : Boolean,
      default: false,
    },
    onBeforePrev: {
      type   : Function as PropType<TravelHook>,
      default: () => true,
    },
    onBeforeNext: {
      type   : Function as PropType<TravelHook>,
      default: () => true,
    },
    onFinished: {
      type   : Function as PropType<FinishedHook>,
      default: noop,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props, { slots }) {
    const onNextHooks = ref([props.onBeforeNext])
    const onPrevHooks = ref([props.onBeforePrev])

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
      if (canNext.value)
        await toStep(model.value + 1)
    }

    async function prev () {
      if (canPrev.value)
        await toStep(model.value - 1)
    }

    async function toStep (to: number) {
      const from  = model.value
      const hooks = to > from
        ? onNextHooks.value
        : onPrevHooks.value

      if (await runAllHooks(hooks, to, from)) {
        if (to <= total.value)
          step.value = to
        else
          await props.onFinished()
      }
    }

    syncRef(step, model)

    provide(STEPS_CONTEXT, {
      step,
      next,
      prev,
      canNext,
      canPrev,
      toStep,
      onPrevHooks,
      onNextHooks,
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
