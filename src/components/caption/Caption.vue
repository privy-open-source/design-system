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
    uppercase: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['caption']

      if (props.bold)
        result.push('caption--bold')

      if (props.uppercase)
        result.push('caption--uppercase')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.caption {
  @apply block text-subtle text-xs tracking-wide;

  &--sm {
    @apply text-tn tracking-wider;
  }

  &--bold {
    @apply font-bold;
  }

  &--uppercase {
    @apply uppercase;
  }
}
</style>
