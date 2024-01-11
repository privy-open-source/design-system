<template>
  <div
    class="wizard"
    data-testid="wizard">
    <div class="wizard__header">
      <WizardHeader
        :active="model - 1"
        :variant="variant"
        :title-variant="titleVariant">
        <slot />
      </WizardHeader>
    </div>
    <div class="wizard__body">
      <WizardBody
        v-model="model"
        :keep-alive="keepAlive"
        :on-before-prev="onBeforePrev"
        :on-before-next="onBeforeNext"
        :on-finished="onFinished">
        <slot />
      </WizardBody>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import WizardHeader from './WizardHeader.vue'
import WizardBody from './WizardBody.vue'
import type { TravelHook, FinishedHook } from '../steps'
import { useVModel } from '../input'
import type { TitleVariant, IconVariant } from '../progress'

const props = defineProps({
  modelValue: {
    type   : Number,
    default: 1,
  },
  variant: {
    type   : String as PropType<IconVariant>,
    default: 'dot',
  },
  titleVariant: {
    type   : String as PropType<TitleVariant>,
    default: 'specific',
  },
  keepAlive: {
    type   : Boolean,
    default: false,
  },
  onBeforePrev: {
    type   : Function as PropType<TravelHook>,
    default: undefined,
  },
  onBeforeNext: {
    type   : Function as PropType<TravelHook>,
    default: undefined,
  },
  onFinished: {
    type   : Function as PropType<FinishedHook>,
    default: undefined,
  },
})

defineEmits<{
  'update:modelValue': [number],
}>()

const model = useVModel(props)
</script>

<style lang="postcss">
.wizard {
  @apply flex flex-col w-full space-y-3;

  &__header {
    @apply shrink-0;
  }

  &__body {
    @apply grow;
  }
}
</style>
