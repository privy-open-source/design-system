<template>
  <div
    data-testid="divider"
    class="divider"
    :class="classNames" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    vertical: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = []

      if (props.vertical)
        result.push('divider--vertical')
      else
        result.push('divider--horizontal')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.divider {
  @apply bg-subtle-alpha;
  @apply dark:bg-dark-subtle-alpha my-2;

  &&--horizontal {
    @apply w-full h-[1px];
  }

  &&--vertical,
  .input-group > & {
    @apply flex items-center my-0 py-3 border-subtle bg-transparent z-1 border-y;
    @apply dark:border-dark-subtle dark:bg-transparent;

    &::before {
      @apply content-[''] bg-subtle-alpha w-[1px] h-full;
      @apply dark:bg-dark-subtle-alpha;
    }
  }

  .state--error & {
    @apply border-danger-emphasis;
    @apply dark:border-dark-danger-emphasis;

    &::before {
      @apply bg-danger-emphasis;
      @apply dark:bg-dark-danger-emphasis;
    }
  }

  .state--disabled & {
    @apply bg-subtle border-subtle pointer-events-none text-muted;
    @apply dark:bg-dark-subtle dark:border-dark-subtle dark:text-dark-muted;
  }
}
</style>
