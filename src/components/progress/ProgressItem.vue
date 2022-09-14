<template>
  <div
    class="progress__item">
    <div class="progress__content">
      <div class="progress__bar" />
      <div class="progress__point">
        <slot name="icon">
          <div class="progress__point-item" />
        </slot>
      </div>
      <div
        class="progress__label">
        <slot name="label">
          {{ label }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name : 'ProgressItem',
  props: {
    label: {
      type   : String,
      default: '',
    },
  },
})
</script>
