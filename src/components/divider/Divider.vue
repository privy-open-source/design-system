<template>
  <div
    data-testid="divider"
    class="divider"
    :class="classNames" />
</template>

<script lang="ts" setup>
import { computed } from 'vue-demi'

const props = defineProps({
  vertical: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: string[] = []

  if (props.vertical)
    result.push('divider--vertical')
  else
    result.push('divider--horizontal')

  return result
})
</script>

<style lang="postcss">
.divider {
  @apply bg-emphasis-alpha;
  @apply dark:bg-dark-emphasis-alpha my-2;

  &&--horizontal {
    @apply w-full h-[1px];
  }

  &&--vertical,
  .input-group > & {
    @apply flex items-center my-0 py-3 border-subtle bg-transparent z-1 border-y;
    @apply dark:border-dark-subtle dark:bg-transparent;

    &::before {
      @apply content-[''] bg-emphasis-alpha w-[1px] h-full;
      @apply dark:bg-dark-emphasis-alpha;
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
    @apply bg-base border-subtle pointer-events-none text-muted;
    @apply dark:bg-dark-base dark:border-dark-subtle dark:text-dark-muted;
  }
}
</style>
