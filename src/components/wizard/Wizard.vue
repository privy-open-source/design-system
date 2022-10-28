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

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import WizardHeader from './WizardHeader.vue'
import WizardBody from './WizardBody.vue'
import { TravelHook, FinishedHook } from '../steps'
import { useVModel } from '../input'
import { TitleVariant, IconVariant } from '../progress/Progress.vue'

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
  },
  setup (props) {
    const model = useVModel(props)

    return { model }
  },
})
</script>

<style lang="postcss">
.wizard {
  @apply flex flex-col w-full space-y-3;

  .wizard__header {
    @apply flex-shrink-0;
  }

  .wizard__body {
    @apply flex-grow;
  }
}
</style>
