<template>
  <slot />
</template>

<script lang="ts">
import { noop } from 'lodash-es'
import { defineComponent, PropType } from 'vue-demi'
import { TravelHook } from '../steps/use-steps'

export default defineComponent({
  name : 'WizardStep',
  props: {
    title: {
      type   : String,
      default: '',
    },
    onBeforePrev: {
      type   : Function as PropType<TravelHook>,
      default: () => noop,
    },
    onBeforeNext: {
      type   : Function as PropType<TravelHook>,
      default: () => noop,
    },
  },
  setup () {
    return {}
  },
})
</script>
