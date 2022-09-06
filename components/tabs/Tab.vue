<template>
  <section
    data-testid="tab-panel"
    class="tab__panel">
    <div
      data-testid="tab-content"
      class="tab__content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name : 'Tab',
  props: {
    title: {
      type   : String,
      default: '',
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
  },
})
</script>
