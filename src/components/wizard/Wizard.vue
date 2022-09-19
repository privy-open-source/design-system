<template>
  <div
    class="wizard"
    data-testid="wizard">
    <div class="wizard__header">
      <WizardHeader
        :active="model - 1"
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

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import WizardHeader from './WizardHeader.vue'
import WizardBody from './WizardBody.vue'
import { noop } from 'lodash-es'
import { TravelHook, FinishedHook } from '../steps/use-steps'
import { useVModel } from '../input/use-input'
import { TitleVariant } from '../progress/Progress.vue'

export default defineComponent({
  components: {
    WizardHeader,
    WizardBody,
  },
  props: {
    modelValue: {
      type   : Number,
      default: 1,
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
  setup (props) {
    const model = useVModel(props)

    return { model }
  },
})
</script>

<style lang="postcss">
.wizard {
  @apply flex flex-col w-full gap-3;

  .wizard__header {
    @apply flex-shrink-0;
  }

  .wizard__body {
    @apply flex-grow;
  }
}
</style>
