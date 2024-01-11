<template>
  <div
    class="steps"
    data-testid="steps">
    <StepSlider
      :active="step - 1"
      :keep-alive="keepAlive"
      :transition="transition">
      <slot />
    </StepSlider>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import {
  computed,
  provide,
  ref,
} from 'vue-demi'
import StepSlider from './StepSlider.vue'
import { useVModel } from '../input'
import { findAllChildren } from '../utils/vnode'
import type {
  TravelHook,
  FinishedHook,
  DirectionVariant,
  AnimationVariant,
} from '.'
import { STEPS_CONTEXT } from '.'
import { syncRef } from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import { runAllHooks } from './utils/hook'
import { noop } from 'lodash-es'

const props = defineProps({
  modelValue: {
    type   : Number,
    default: 1,
  },
  keepAlive: {
    type   : Boolean,
    default: false,
  },
  direction: {
    type   : String as PropType<DirectionVariant>,
    default: 'horizontal',
  },
  loop: {
    type   : Boolean,
    default: false,
  },
  animation: {
    type   : String as PropType<AnimationVariant>,
    default: 'slide',
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
})

defineEmits<{
  'update:modelValue': [number],
}>()

const slots = defineSlots<{
  'default'(): VNode[],
}>()

const onNextHooks = ref([props.onBeforeNext])
const onPrevHooks = ref([props.onBeforePrev])

const model      = useVModel(props)
const transition = ref(props.direction === 'vertical' ? 'slide-top' : 'slide-left')

const total = computed(() => {
  return findAllChildren(slots.default(), 'Step').length
})

const step = useClamp(model, 1, total)

const canNext = computed(() => {
  return props.loop || model.value <= total.value
})

const canPrev = computed(() => {
  return props.loop || model.value > 1
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

  const toIndex = props.loop
    ? (((to - 1) % total.value + total.value) % total.value) + 1
    : to

  if (await runAllHooks(hooks, toIndex, from)) {
    if (toIndex <= total.value) {
      transition.value = to > from
        ? (props.direction === 'vertical' ? `${props.animation}-top` : `${props.animation}-left`)
        : (props.direction === 'vertical' ? `${props.animation}-bottom` : `${props.animation}-right`)

      step.value = toIndex
    } else
      await props.onFinished()
  }
}

syncRef(step, model)

provide(STEPS_CONTEXT, {
  step,
  next,
  prev,
  total,
  canNext,
  canPrev,
  toStep,
  onPrevHooks,
  onNextHooks,
})
</script>

<style lang="postcss">
  .steps {
    @apply w-full;
  }
</style>
