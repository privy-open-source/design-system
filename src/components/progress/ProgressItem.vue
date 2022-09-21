<template>
  <div
    class="progress__item"
    data-testid="progress-item"
    :class="classNames">
    <div class="progress__content">
      <div class="progress__bar" />
      <div class="progress__point">
        <slot name="icon">
          <div
            data-testid="progress-point-item"
            class="progress__point-item" />
        </slot>
      </div>
      <div
        data-testid="progress-title"
        class="progress__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'

export default defineComponent({
  name : 'ProgressItem',
  props: {
    title: {
      type   : String,
      default: '',
    },
    active: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = []

      if (props.active)
        result.push('progress--active')

      return result
    })

    return { classNames }
  },
})
</script>
