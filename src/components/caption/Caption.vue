<template>
  <span
    data-testid="caption"
    :class="classNames">
    <slot />
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    bold: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['caption']

      if (props.bold)
        result.push('caption--bold')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.caption {
  @apply block text-subtext-100 text-sm;

  &--bold {
    @apply font-bold;
  }
}
</style>
