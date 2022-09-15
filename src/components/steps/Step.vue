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
import { defineComponent } from 'vue-demi'
import { useStep } from './use-steps'

export default defineComponent({
  name: 'Step',
  setup () {
    const context = useStep()

    return { ...context }
  },
})
</script>
